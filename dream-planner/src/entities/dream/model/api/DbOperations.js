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
    async getAllPaginated({ page = 1, perPage = 6, cursors = [] }) {
        let q;
        const realLimit = perPage + 1;
        if (page === 1) {
            q = query(
                this.collectionRef,
                orderBy("createdAt", "desc"), // Сортуємо за датою створення (новіші спочатку)
                limit(realLimit)
            );
        } else {
            const cursor = cursors[page - 2];
            if (!cursor) throw new Error("Cursor not found");
            q = query(
                this.collectionRef,
                orderBy("createdAt", "desc"),
                startAfter(cursor), // Починаємо після курсора
                limit(realLimit)
            );
        }
        const snapshot = await getDocs(q);
        const docs = snapshot.docs;
        const hasMore = docs.length > perPage;
        const data = docs
            .slice(0, perPage)
            .map((doc) => ({ id: doc.id, ...doc.data() }));
        const lastVisible = docs[docs.length - 2] || null;
        const totalSnapshot = await getDocs(this.collectionRef);
        const totalDocs = totalSnapshot.size;
        const totalPages = Math.ceil(totalDocs / perPage);
        return { data, cursor: lastVisible, hasMore, totalPages };
    }
    async getById(id) {
        const snap = await getDoc(doc(this.collectionRef, id));
        return { id: snap.id, ...snap.data() };
    }
    async add(data) {
        const dreamData = {
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        await addDoc(this.collectionRef, dreamData);
        return true;
    }
    async update(id, data) {
        const updateData = {
            ...data,
            updatedAt: new Date().toISOString()
        };
        await updateDoc(doc(this.collectionRef, id), updateData);
        return true;
    }
    async delete(id) {
        await deleteDoc(doc(this.collectionRef, id));
        return true;
    }
}
export default DbOperations;
