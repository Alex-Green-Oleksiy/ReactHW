import React from "react";

// Компонент для відображення інформації про одне авто
function Auto({ model, year, price, imgSrc }) {
    return (
        <div>
            <h1>{model}</h1>
            <p>{year}</p>
            <p>{price}</p>
            <img src={imgSrc} alt="auto" />
        </div>
    );
}

// Компонент для списку авто
function AutoList() {
    return (
        <>
            {/* Перший автомобіль */}
            <Auto
                model="BMW"
                year="2020"
                price="100000"
                imgSrc="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d"
            />
            {/* Другий автомобіль */}
            <Auto
                model="BMW"
                year="2020"
                price="100000"
                imgSrc="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d"
            />
        </>
    );
}

export default AutoList;
