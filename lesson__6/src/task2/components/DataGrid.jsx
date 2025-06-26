import React, { useState, useMemo, useDeferredValue, useCallback } from "react";
import GridRow from "./GridRow";
import styles from "../styles/DataGridTask2.module.css";
import {
    SEARCH_LABEL,
    SORT_LABEL,
    SEARCH_PLACEHOLDER,
    GRID_COLUMNS
} from "../data";
import { DATA_SIZE, NAMES, CITIES } from "../constants";

function generateData(count = DATA_SIZE) {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: NAMES[Math.floor(Math.random() * NAMES.length)] + " " + (i + 1),
        age: 18 + Math.floor(Math.random() * 40),
        city: CITIES[Math.floor(Math.random() * CITIES.length)]
    }));
}

export default function DataGridTask2() {
    const [data] = useState(() => generateData(1000));
    const [filter, setFilter] = useState("");
    const [sortBy, setSortBy] = useState("id");
    const [sortDir, setSortDir] = useState("asc");
    const [selected, setSelected] = useState(null);

    const deferredFilter = useDeferredValue(filter);
    const deferredSortBy = useDeferredValue(sortBy);
    const deferredSortDir = useDeferredValue(sortDir);

    const handleSort = useCallback(
        (col) => {
            setSortBy(col);
            setSortDir((prev) =>
                col === sortBy ? (prev === "asc" ? "desc" : "asc") : "asc"
            );
        },
        [sortBy]
    );

    const handleRowClick = useCallback((row) => {
        setSelected(row);
    }, []);

    const filteredSortedData = useMemo(() => {
        let filtered = data;
        if (deferredFilter.trim()) {
            const q = deferredFilter.trim().toLowerCase();
            filtered = data.filter(
                (row) =>
                    row.name.toLowerCase().includes(q) ||
                    row.city.toLowerCase().includes(q) ||
                    String(row.age).includes(q) ||
                    String(row.id).includes(q)
            );
        }
        const sorted = [...filtered].sort((a, b) => {
            let cmp = 0;
            if (a[deferredSortBy] < b[deferredSortBy]) cmp = -1;
            if (a[deferredSortBy] > b[deferredSortBy]) cmp = 1;
            return deferredSortDir === "asc" ? cmp : -cmp;
        });
        return sorted;
    }, [data, deferredFilter, deferredSortBy, deferredSortDir]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                Задача 2: DataGrid з фільтрацією та сортуванням
            </h2>
            <input
                className={styles.input}
                type="text"
                placeholder={SEARCH_PLACEHOLDER}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            <table className={styles.table}>
                <thead>
                    <tr>
                        {GRID_COLUMNS.map((col) => (
                            <th
                                key={col.key}
                                onClick={() => handleSort(col.key)}
                            >
                                {col.label}{" "}
                                {sortBy === col.key
                                    ? sortDir === "asc"
                                        ? "▲"
                                        : "▼"
                                    : ""}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredSortedData.slice(0, 30).map((row) => (
                        <GridRow
                            key={row.id}
                            row={row}
                            onClick={handleRowClick}
                        />
                    ))}
                </tbody>
            </table>
            <div className={styles.info}>
                {filteredSortedData.length} записів, показано перші 30
            </div>
            {selected && (
                <div className={styles.selected}>
                    <b>Вибрано:</b> {selected.name}, {selected.age} років,{" "}
                    {selected.city}
                </div>
            )}
        </div>
    );
}
