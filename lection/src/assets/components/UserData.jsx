import React, { useState } from "react";

// Компонент для введення року народження і обчислення віку
function UserData() {
    // Стан для зберігання року народження (початкове значення — 2000)
    const [year, setYear] = useState(2000);
    // Стан для зберігання віку (початкове значення — 25)
    const [age, setAge] = useState(25);

    // Обробник зміни значення інпута (оновлює рік народження)
    function handleYearChange(event) {
        setYear(parseInt(event.target.value)); // Оновлюємо рік народження
    }

    // Функція для обчислення віку на основі поточного року
    function setAgeHandler() {
        setAge(new Date().getFullYear() - year); // Оновлюємо вік
    }

    return (
        <>
            {/* Поле для введення року народження */}
            <label>
                year{" "}
                <input
                    type="number"
                    value={year}
                    onChange={handleYearChange}
                ></input>
            </label>
            <hr />
            {/* Кнопка для обчислення віку */}
            <button onClick={setAgeHandler}>Get age</button>
            {/* Відображення обчисленого віку */}
            <div>{`Your age: ${age}`}</div>
        </>
    );
}

export default UserData;
