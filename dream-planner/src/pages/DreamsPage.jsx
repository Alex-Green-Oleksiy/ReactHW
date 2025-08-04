import { useState, useEffect, useMemo } from "react";
import { useGetDreamsQuery } from "@/entities/dream";
import { DreamList } from "@/widgets/DreamListWidget";
import { AddDreamButton } from "@/features/dream";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import styles from "@/pages/DreamsPage.module.css";
export default function DreamsPage() {
    const [page, setPage] = useState(1);
    const [cursors, setCursors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [perPage, setPerPage] = useState(6);
    const { data, isLoading, error, refetch } = useGetDreamsQuery({
        page,
        perPage,
        cursors
    });
    const allDreams = data?.data || []; // Якщо даних немає, використовуємо порожній масив
    const hasMore = data?.hasMore; // Чи є ще дані для завантаження
    const totalPages = data?.totalPages || 1; // Загальна кількість сторінок
    const filteredDreams = useMemo(() => {
        if (!searchTerm.trim()) return allDreams; // Якщо пошук порожній, показуємо всі мрії
        return allDreams.filter((dream) =>
            dream.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [allDreams, searchTerm]);
    useEffect(() => {
        if (data?.cursor && cursors.length < page) {
            setCursors((prev) => [...prev, data.cursor]);
        }
        if (data?.data.length === 0 && page > 1) {
            setPage((p) => p - 1);
        }
    }, [data, cursors?.length, page]);
    useEffect(() => {
        setCursors([]);
        setPage(1);
    }, [perPage]);
    // Обробка помилок
    if (error) {
        return (
            <div className={styles.dreamsPage}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Мої мрії</h1>
                </div>
                <div className={styles.addButtonContainer}>
                    <AddDreamButton />
                </div>
                <ErrorMessage error={error} onRetry={() => refetch()} />
            </div>
        );
    }

    return (
        <div className={styles.dreamsPage}>
            <div className={styles.header}>
                <h1 className={styles.title}>Мої мрії</h1>
            </div>
            <div className={styles.addButtonContainer}>
                <AddDreamButton />
            </div>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Пошук мрій за описом..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
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
            <div className={styles.perPageContainer}>
                <label htmlFor="perPage" className={styles.perPageLabel}>
                    Показати на сторінці:
                </label>
                <select
                    id="perPage"
                    value={perPage}
                    onChange={(e) => setPerPage(Number(e.target.value))}
                    className={styles.perPageSelect}
                >
                    <option value={6}>6 мрій</option>
                    <option value={9}>9 мрій</option>
                    <option value={12}>12 мрій</option>
                    <option value={24}>24 мрії</option>
                </select>
            </div>
            <div className={styles.content}>
                <DreamList
                    dreams={filteredDreams}
                    page={page}
                    setPage={setPage}
                    hasMore={hasMore}
                    isLoading={isLoading}
                    totalPages={totalPages}
                />
            </div>
        </div>
    );
}
