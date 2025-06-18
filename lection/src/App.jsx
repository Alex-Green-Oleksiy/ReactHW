import React from "react";
// import { useState } from "react";
import "./App.scss";
import UserCardList from "./assets/components/UserCardList";
import AutoList from "./assets/components/AutoList";
import Counter from "./assets/components/Counter";
import Calculator from "./assets/components/Calculator";
import UserData from "./assets/components/UserData";
import WishesManager from "./assets/components/Wishes";

// Головний компонент застосунку
function App() {
    return (
        <>
            <UserCardList />
            <AutoList />
            <Counter />
            <Calculator />
            <UserData />
            <WishesManager />
        </>
    );
}

export default App;
