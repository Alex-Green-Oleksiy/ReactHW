import React, { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { routes } from "@/app/router";
import styles from "./MobileMenu.module.css";

// Компонент мобільного меню для планшетів та телефонів
const MobileMenu = () => {
    // Стан для відкриття/закриття мобільного меню
    const [isOpen, setIsOpen] = useState(false);

    // Функція для закриття меню при кліку на посилання
    const handleLinkClick = () => {
        setIsOpen(false);
    };

    // useEffect для обробки клавіші Escape та блокування скролу
    useEffect(() => {
        // Функція для закриття меню при натисканні Escape
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            // Додаємо слухач події для клавіші Escape
            document.addEventListener("keydown", handleEscape);
            // Блокуємо скрол на body, щоб не можна було скролити під меню
            document.body.style.overflow = "hidden";
        } else {
            // Відновлюємо скрол
            document.body.style.overflow = "unset";
        }

        // Очищаємо слухачі при розмонтуванні компонента
        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // Отримуємо список пунктів меню з роутера
    const menuItems = routes[0].children.filter((route) => route.meta?.label);

    return (
        <div className={styles.mobileMenuContainer}>
            {/* Бургер кнопка для відкриття/закриття меню */}
            <button
                className={`${styles.burgerButton} ${
                    isOpen ? styles.active : ""
                }`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
            >
                {/* Три лінії бургер-меню */}
                <span></span>
                <span></span>
                <span></span>
            </button>

            {/* Мобільне меню з пунктами навігації */}
            <div
                className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}
            >
                <nav className={styles.mobileNav}>
                    {/* Рендеримо кожен пункт меню з затримкою анімації */}
                    {menuItems.map((route, index) => (
                        <NavLink
                            key={route.path || "index"}
                            to={route.path || "/"}
                            className={({ isActive }) =>
                                `${styles.mobileLink} ${
                                    isActive ? styles.active : ""
                                }`
                            }
                            onClick={handleLinkClick}
                            style={{
                                animationDelay: `${index * 0.1}s` // Затримка для появу кожного пункту
                            }}
                        >
                            {route.meta.label}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default MobileMenu;
