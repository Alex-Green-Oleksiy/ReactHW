import React, { useState, useMemo } from "react";
import CalculatorInputs from "./components/CalculatorInputs";
import CounterButton from "./components/CounterButton";
import ResultDisplay from "./components/ResultDisplay";
import styles from "./styles/Task1Calculator.module.css";

export default function Task1Calculator() {
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    const [counter, setCounter] = useState(0);

    const sum = useMemo(() => Number(a) + Number(b), [a, b]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                Задача 1: Калькулятор з useMemo та React.memo
            </h2>
            <CalculatorInputs a={a} b={b} setA={setA} setB={setB} />
            <CounterButton counter={counter} setCounter={setCounter} />
            <ResultDisplay result={sum} />
        </div>
    );
}
