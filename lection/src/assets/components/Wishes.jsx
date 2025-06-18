import React from "react";
import { useState } from "react";

// Компонент для керування списком побажань
function WishesManager() {
    // Стан для списку побажань (початково два побажання)
    const [wishesList, setWishesList] = useState(["love", "peace"]);
    // Стан для поточного тексту нового побажання
    const [wish, setWish] = useState("");

    // Додає нове побажання до списку і очищає поле вводу
    function onWishAdd() {
        setWishesList((prevList) => [...prevList, wish]); // Додаємо новий елемент до списку
        setWish(""); // Очищаємо поле вводу
    }

    return (
        <div>
            <div>
                {/* Поле для введення нового побажання */}
                <label>
                    new wish
                    <input
                        type="text"
                        value={wish}
                        onChange={(e) => setWish(e.target.value)} // Оновлюємо стан при зміні тексту
                    />
                </label>
                {/* Кнопка для додавання побажання */}
                <button onClick={onWishAdd}>add</button>
            </div>
            {/* Відображення всіх побажань через кому */}
            <div>{wishesList.join(", ")}</div>
        </div>
    );
}

export default WishesManager;
