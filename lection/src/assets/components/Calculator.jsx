import React, { useState } from "react";
// import "./App.scss";

// Компонент-калькулятор для двох чисел
function Calculator() {
    // Стан для першого числа
    const [num1, setNum1] = useState(0);
    // Стан для другого числа
    const [num2, setNum2] = useState(0);

    // Очищення обох чисел
    const handleClear = () => {
        setNum1(0);
        setNum2(0);
    };

    return (
        <>
            {/* Поле для введення першого числа */}
            <div>
                <label>
                    first
                    <input
                        type="number"
                        value={num1}
                        onChange={(e) => setNum1(Number(e.target.value))}
                    />
                </label>
            </div>
            {/* Поле для введення другого числа */}
            <div>
                <label>
                    second
                    <input
                        type="number"
                        value={num2}
                        onChange={(e) => setNum2(Number(e.target.value))}
                    />
                </label>
            </div>
            {/* Кнопка очищення */}
            <button onClick={handleClear}>clear</button>
            {/* Відображення суми, різниці та добутку */}
            <div>{`sum: ${num1 + num2}`}</div>
            <div>{`difference: ${num1 - num2}`}</div>
            <div>{`multiplication: ${num1 * num2}`}</div>
        </>
    );
}

export default Calculator;
