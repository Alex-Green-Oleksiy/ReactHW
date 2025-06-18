import React from "react";

// Компонент для відображення інформації про одного користувача
function UserCard({ name, age, position, salary }) {
    return (
        <div>
            <h1>{name}</h1>
            <p>{age}</p>
            <p>{position}</p>
            <p>{`Зарплата: ${salary}`}</p>
        </div>
    );
}

// Компонент для списку користувачів
function UserCardList() {
    return (
        <>
            {/* Перший користувач */}
            <UserCard
                name="John"
                age="20"
                position="Developer"
                salary={100000}
            />
            {/* Другий користувач */}
            <UserCard
                name="Jane"
                age="21"
                position="Designer"
                salary={100000}
            />
        </>
    );
}

export default UserCardList;
