import React, { useState } from "react";

// Компонент-лічильник
function Counter() {
    // Стан для поточного числа (початкове значення — 0)
    const [count, setCount] = useState(0);

    // Обробник кліку по кнопці
    // Кожен setCount(prevCount => prevCount + 1) збільшує значення на 1
    // Оскільки використовується функціональний варіант setCount, всі чотири виклики відпрацюють послідовно
    // В результаті count збільшиться на 4 за один клік
    function clickHandler() {
        setCount((prevCount) => prevCount + 1);
        setCount((prevCount) => prevCount + 1);
        setCount((prevCount) => prevCount + 1);
        setCount((prevCount) => prevCount + 1);
    }

    return (
        <>
            {/* Відображення поточного значення лічильника */}
            <p>{count}</p>
            {/* Кнопка для збільшення лічильника на 4 */}
            <button onClick={clickHandler}>збільшити</button>
        </>
    );
}

export default Counter;
