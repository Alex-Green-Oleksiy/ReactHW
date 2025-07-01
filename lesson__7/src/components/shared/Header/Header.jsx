import { Link, useLocation } from "react-router-dom";
import styles from "../../../styles/Header.module.css";

export default function Header() {
    const location = useLocation();
    const navLinks = [
        { to: "/", label: "Головна" },
        { to: "/shop", label: "Магазин" },
        { to: "/rules", label: "Правила оплати" },
        { to: "/contacts", label: "Контакти" }
    ];
    return (
        <header className={styles.header}>
            <div className={styles.header_container}>
                <nav className={styles.nav}>
                    <span className={styles.logo}>Shop</span>
                    <div className={styles.navLinks}>
                        {navLinks.map(({ to, label }) => (
                            <Link
                                key={to}
                                to={to}
                                className={
                                    location.pathname === to
                                        ? `${styles.link} ${styles.active}`
                                        : styles.link
                                }
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </nav>
            </div>
        </header>
    );
}
