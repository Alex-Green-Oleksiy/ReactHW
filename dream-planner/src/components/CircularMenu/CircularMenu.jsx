import { useState, useEffect } from 'react';
import { NavLink } from 'react-router';
import { routes } from '@/app/router';
import styles from './CircularMenu.module.css';

// Функція для отримання пунктів меню з роутера
// Фільтруємо тільки ті роути, які мають мета-інформацію з label
const getMenuItems = () => {
    return routes[0].children
        .filter((r) => r?.meta?.label)
        .map((r, index) => ({
            id: index + 1,
            path: r.index ? "/" : r.path, // Якщо це головна сторінка, використовуємо "/"
            label: r.meta.label
        }));
};

// Компонент кругового меню для десктопної версії
export default function CircularMenu() {
    // Стан для відкриття/закриття меню
    const [isOpen, setIsOpen] = useState(false);
    // Текст на кнопці toggle (Menu/Close)
    const [toggleText, setToggleText] = useState('Menu');

    // Функція для перемикання стану меню
    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setToggleText(isOpen ? 'Menu' : 'Close');
    };

    // useEffect для автоматичного відкриття меню через 800ms після завантаження
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
            setToggleText('Close');
        }, 800);

        // Очищаємо таймер при розмонтуванні компонента
        return () => clearTimeout(timer);
    }, []);

    // Отримуємо список пунктів меню
    const menuItems = getMenuItems();

    return (
        <>
            {/* Логотип додатку */}
            <div className={styles.logoContainer}>
                <NavLink to="/" className={styles.logo}>
                    <svg
                        className={styles.logoIcon}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                    </svg>
                    <span className={styles.logoText}>Планувальник мрій</span>
                </NavLink>
            </div>

            {/* Кругове меню з пунктами навігації */}
            <nav className={`${styles.nav} ${isOpen ? styles.open : ''} ${styles.topRight}`}>
                {/* Рендеримо кожен пункт меню як окреме посилання */}
                {menuItems.map((item) => (
                    <NavLink
                        key={item.id}
                        to={item.path}
                        className={`${styles.disc} ${styles[`l${item.id}`]}`}
                    >
                        <div>{item.label}</div>
                    </NavLink>
                ))}
                {/* Кнопка для відкриття/закриття меню */}
                <a
                    className={`${styles.disc} ${styles[`l${menuItems.length + 1}`]} ${styles.toggle}`}
                    onClick={toggleMenu}
                >
                    {toggleText}
                </a>
            </nav>
        </>
    );
} 