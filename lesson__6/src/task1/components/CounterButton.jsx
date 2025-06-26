import React from "react";
import styles from "../styles/CounterButton.module.css";
import { COUNTER_BUTTON_TEXT } from "../data";

export default function CounterButton({ counter, setCounter }) {
    return (
        <button className={styles.btn} onClick={() => setCounter((c) => c + 1)}>
            {COUNTER_BUTTON_TEXT} ({counter})
        </button>
    );
}
