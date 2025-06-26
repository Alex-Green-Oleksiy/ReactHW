import React from "react";
import styles from "../styles/CalculatorInputs.module.css";
import { CALCULATOR_FIELDS } from "../data";

export default function CalculatorInputs({ a, b, setA, setB }) {
    const values = { a, b };
    const setters = { a: setA, b: setB };
    return (
        <div>
            {CALCULATOR_FIELDS.map((field) => (
                <label className={styles.label} key={field.name}>
                    {field.label}
                    <input
                        className={styles.input}
                        type="number"
                        value={values[field.name]}
                        onChange={(e) => setters[field.name](e.target.value)}
                    />
                </label>
            ))}
        </div>
    );
}
