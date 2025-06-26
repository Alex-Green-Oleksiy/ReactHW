import React from "react";
import styles from "../styles/ResultDisplay.module.css";
import { RESULT_LABEL } from "../data";

const ResultDisplay = React.memo(function ResultDisplay({ result }) {
    return (
        <div className={styles.result}>
            {RESULT_LABEL}
            {result}
        </div>
    );
});

export default ResultDisplay;
