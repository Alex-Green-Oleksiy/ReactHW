import db from "@/shared/config/firebase-config";
import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    deleteDoc,
    updateDoc,
    query,
    orderBy,
    limit,
    startAfter
} from "firebase/firestore/lite";
class DbOperations {
    constructor(name) {
        this.collectionRef = collection(db, name);
    }
    async getAllPaginated({
        page = 1,
        perPage = 6,
        cursors = [],
        sortBy = "date-desc",
        searchTerm = ""
    }) {
        try {
            let q;
            const realLimit = perPage + 1;
            let orderField = "createdAt";
            let orderDirection = "desc";
            if (sortBy === "date-asc") {
                orderDirection = "asc";
            } else if (sortBy === "alpha-asc" || sortBy === "alpha-desc") {
                orderField = "description";
                orderDirection = sortBy === "alpha-asc" ? "asc" : "desc";
            }
            const filters = [];
            if (searchTerm && searchTerm.trim()) {
                // Firestore не підтримує contains, але можна >= і < для префіксного пошуку
                const searchLower = searchTerm.toLowerCase();
                const searchUpper = searchLower.replace(/.$/, (c) =>
                    String.fromCharCode(c.charCodeAt(0) + 1)
                );
                filters.push(
                    orderBy("description")
                    // >= searchLower
                    // < searchUpper
                );
            }
            if (page === 1) {
                q = query(
                    this.collectionRef,
                    ...(filters.length
                        ? filters
                        : [orderBy(orderField, orderDirection)]),
                    limit(realLimit)
                );
            } else {
                const cursorId = cursors[page - 2];
                if (!cursorId) throw new Error("Cursor not found");
                const cursorDoc = await getDoc(
                    doc(this.collectionRef, cursorId)
                );
                if (!cursorDoc.exists())
                    throw new Error("Cursor document not found");
                q = query(
                    this.collectionRef,
                    ...(filters.length
                        ? filters
                        : [orderBy(orderField, orderDirection)]),
                    startAfter(cursorDoc),
                    limit(realLimit)
                );
            }
            const snapshot = await getDocs(q);
            let docs = snapshot.docs;
            // Firestore не підтримує contains, тому додатково фільтруємо тут, якщо searchTerm є
            if (searchTerm && searchTerm.trim()) {
                docs = docs.filter((doc) =>
                    doc
                        .data()
                        .description?.toLowerCase()
                        .includes(searchTerm.toLowerCase())
                );
            }
            const hasMore = docs.length > perPage;
            const data = docs
                .slice(0, perPage)
                .map((doc) => ({ id: doc.id, ...doc.data() }));
            const lastVisible = docs[docs.length - 2] || null;
            const lastVisibleId = lastVisible ? lastVisible.id : null;
            const totalPages = hasMore ? page + 1 : page;
            return { data, cursor: lastVisibleId, hasMore, totalPages };
        } catch (error) {
            console.error("Firestore query error:", error);

            // Обробка помилки 429 (Too Many Requests)
            if (
                error.code === "resource-exhausted" ||
                error.message?.includes("429")
            ) {
                throw new Error(
                    "Перевищено ліміт запитів до Firebase. Спробуйте пізніше."
                );
            }

            // Інші помилки
            throw new Error(`Помилка завантаження даних: ${error.message}`);
        }
    }
    async getById(id) {
        try {
            const snap = await getDoc(doc(this.collectionRef, id));
            if (!snap.exists()) {
                throw new Error("Документ не знайдено");
            }
            return { id: snap.id, ...snap.data() };
        } catch (error) {
            console.error("Firestore getById error:", error);
            throw new Error(`Помилка отримання мрії: ${error.message}`);
        }
    }

    async add(data) {
        try {
            const dreamData = {
                ...data,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            await addDoc(this.collectionRef, dreamData);
            return true;
        } catch (error) {
            console.error("Firestore add error:", error);
            throw new Error(`Помилка додавання мрії: ${error.message}`);
        }
    }

    async update(id, data) {
        try {
            const updateData = {
                ...data,
                updatedAt: new Date().toISOString()
            };
            await updateDoc(doc(this.collectionRef, id), updateData);
            return true;
        } catch (error) {
            console.error("Firestore update error:", error);
            throw new Error(`Помилка оновлення мрії: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            await deleteDoc(doc(this.collectionRef, id));
            return true;
        } catch (error) {
            console.error("Firestore delete error:", error);
            throw new Error(`Помилка видалення мрії: ${error.message}`);
        }
    }
}
export default DbOperations;
