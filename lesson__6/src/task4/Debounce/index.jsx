import React, { useState, useMemo } from "react";
import useDebounce from "../useDebounce";
import styles from "./DebounceTask4.module.css";
import ResultsList from "./ResultsList";

const names = [
    "Anna",
    "Ivan",
    "Petro",
    "Olga",
    "Svitlana",
    "Dmytro",
    "Oleh",
    "Nina",
    "Andrii",
    "Kateryna",
    "Mykola",
    "Yulia",
    "Viktor",
    "Iryna",
    "Serhii",
    "Larysa"
];

export default function DebounceTask4() {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 500);

    const filtered = useMemo(() => {
        const q = debouncedQuery.trim().toLowerCase();
        if (!q) return names;
        return names.filter((name) => name.toLowerCase().includes(q));
    }, [debouncedQuery]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Задача 4: useDebounce</h2>
            <input
                className={styles.input}
                type="text"
                placeholder="Пошук імені..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <div className={styles.info}>
                (Результати оновлюються з затримкою 500мс після зупинки
                введення)
            </div>
            <ResultsList filtered={filtered} />
        </div>
    );
}
