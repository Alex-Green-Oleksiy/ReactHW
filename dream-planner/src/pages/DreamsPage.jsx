import { useState, useEffect, useMemo } from "react";
import { useGetDreamsQuery } from "@/entities/dream";
import { DreamList } from "@/widgets/DreamListWidget";
import { AddDreamButton } from "@/features/dream";
import styles from "@/pages/DreamsPage.module.css";

// Сторінка зі списком всіх мрій користувача
export default function DreamsPage() {
    // Стан для поточної сторінки (для пагінації)
    const [page, setPage] = useState(1);
    // Масив курсорів для навігації між сторінками в Firestore
    const [cursors, setCursors] = useState([]);
    // Стан для пошукового запиту
    const [searchTerm, setSearchTerm] = useState("");
    // Кількість мрій на одній сторінці
    const perPage = 6;

    // Отримуємо дані з бази даних за допомогою RTK Query
    // useGetDreamsQuery автоматично кешує результати та оновлює дані
    const { data, isLoading } = useGetDreamsQuery({ page, perPage, cursors });
    const allDreams = data?.data || []; // Якщо даних немає, використовуємо порожній масив
    const hasMore = data?.hasMore; // Чи є ще дані для завантаження

    // Фільтруємо мрії за пошуковим запитом
    // useMemo оптимізує перерахунок - фільтрація відбувається тільки при зміні allDreams або searchTerm
    const filteredDreams = useMemo(() => {
        if (!searchTerm.trim()) return allDreams; // Якщо пошук порожній, показуємо всі мрії
        return allDreams.filter((dream) =>
            dream.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [allDreams, searchTerm]);

    // useEffect для роботи з курсорами та пагінацією
    useEffect(() => {
        // Зберігаємо курсор для наступної сторінки
        if (data?.cursor && cursors.length < page) {
            setCursors((prev) => [...prev, data.cursor]);
        }
        // Якщо на поточній сторінці немає даних і це не перша сторінка,
        // повертаємося на попередню сторінку
        if (data?.data.length === 0 && page > 1) {
            setPage((p) => p - 1);
        }
    }, [data, cursors?.length, page]);

    return (
        <div className={styles.dreamsPage}>
            {/* Заголовок сторінки */}
            <div className={styles.header}>
                <h1 className={styles.title}>Мої мрії</h1>
                <p className={styles.subtitle}>
                    Відстежуйте та плануйте реалізацію ваших найважливіших цілей
                </p>
            </div>

            {/* Кнопка для додавання нової мрії */}
            <div className={styles.addButtonContainer}>
                <AddDreamButton />
            </div>

            {/* Поле пошуку мрій */}
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Пошук мрій за описом..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                {/* Іконка пошуку */}
                <svg
                    className={styles.searchIcon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>

            {/* Список мрій з пагінацією */}
            <div className={styles.content}>
                <DreamList
                    dreams={filteredDreams}
                    page={page}
                    setPage={setPage}
                    hasMore={hasMore}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}
