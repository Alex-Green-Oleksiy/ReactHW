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

// Клас для роботи з Firebase Firestore
// Інкапсулює всю логіку роботи з базою даних
class DbOperations {
    constructor(name) {
        // Створюємо посилання на колекцію в Firestore
        this.collectionRef = collection(db, name);
    }

    // Отримання даних з пагінацією
    // Підтримує курсори для ефективної навігації між сторінками
    async getAllPaginated({ page = 1, perPage = 6, cursors = [] }) {
        let q;

        // Беремо на 1 більше для визначення, чи є ще дані
        const realLimit = perPage + 1;

        if (page === 1) {
            // Для першої сторінки просто сортуємо та обмежуємо кількість
            q = query(
                this.collectionRef,
                orderBy("createdAt", "desc"), // Сортуємо за датою створення (новіші спочатку)
                limit(realLimit)
            );
        } else {
            // Для наступних сторінок використовуємо курсор
            const cursor = cursors[page - 2];
            if (!cursor) throw new Error("Cursor not found");
            q = query(
                this.collectionRef,
                orderBy("createdAt", "desc"),
                startAfter(cursor), // Починаємо після курсора
                limit(realLimit)
            );
        }

        // Виконуємо запит
        const snapshot = await getDocs(q);
        const docs = snapshot.docs;

        // Визначаємо, чи є ще дані для завантаження
        const hasMore = docs.length > perPage;

        // Повертаємо тільки потрібну кількість документів
        const data = docs
            .slice(0, perPage)
            .map((doc) => ({ id: doc.id, ...doc.data() }));

        // Зберігаємо курсор для наступної сторінки
        const lastVisible = docs[docs.length - 2] || null;

        return { data, cursor: lastVisible, hasMore };
    }

    // Отримання одного документа за ID
    async getById(id) {
        const snap = await getDoc(doc(this.collectionRef, id));
        return { id: snap.id, ...snap.data() };
    }

    // Додавання нового документа
    async add(data) {
        // Додаємо метадані (дати створення та оновлення)
        const dreamData = {
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        await addDoc(this.collectionRef, dreamData);
        return true;
    }

    // Оновлення існуючого документа
    async update(id, data) {
        // Оновлюємо дату модифікації
        const updateData = {
            ...data,
            updatedAt: new Date().toISOString()
        };
        await updateDoc(doc(this.collectionRef, id), updateData);
        return true;
    }

    // Видалення документа
    async delete(id) {
        await deleteDoc(doc(this.collectionRef, id));
        return true;
    }
}

export default DbOperations;
