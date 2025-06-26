import React from "react";
import styles from "./DebounceTask4.module.css";

export default function ResultsList({ filtered }) {
    return (
        <ul>
            {filtered.length === 0 ? (
                <li className={styles.notfound}>Нічого не знайдено</li>
            ) : (
                filtered.map((name) => <li key={name}>{name}</li>)
            )}
        </ul>
    );
}
