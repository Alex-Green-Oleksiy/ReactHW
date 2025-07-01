import React from "react";
import styles from "../styles/CalculatorInputs.module.css";

export default function CalculatorInputs({ a, b, setA, setB }) {
    return (
        <div>
            <label className={styles.label}>
                A:
                <input
                    className={styles.input}
                    type="number"
                    value={a}
                    onChange={(e) => setA(e.target.value)}
                />
            </label>
            <label className={styles.label}>
                B:
                <input
                    className={styles.input}
                    type="number"
                    value={b}
                    onChange={(e) => setB(e.target.value)}
                />
            </label>
        </div>
    );
}
