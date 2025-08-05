import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { routes } from "@/app/router";
import styles from "@/widgets/MainLayout/ui/MainLayout.module.css";

export default function MainMenu() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const itemsForMenu = routes[0].children
        .filter((r) => r?.meta?.label)
        .map((r) => ({
            path: r.index ? "/" : r.path,
            label: r.meta.label
        }));

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // Закриття меню при натисканні Escape та блокування скролу
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                closeMobileMenu();
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.classList.add("mobile-menu-open");
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.classList.remove("mobile-menu-open");
        };
    }, [isMobileMenuOpen]);

    // Закриття меню при зміні розміру вікна на більший
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && isMobileMenuOpen) {
                closeMobileMenu();
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isMobileMenuOpen]);

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
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

                {/* Desktop Navigation */}
                <nav className={styles.nav}>
                    {itemsForMenu.map((r) => (
                        <NavLink
                            key={r.path}
                            to={r.path}
                            className={({ isActive }) =>
                                `${styles.navLink} ${
                                    isActive ? styles.active : ""
                                }`
                            }
                        >
                            {r.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className={styles.mobileMenuButton}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
                >
                    <svg
                        className={styles.mobileMenuIcon}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {isMobileMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`${styles.mobileMenu} ${
                    isMobileMenuOpen ? styles.open : ""
                }`}
            >
                <nav className={styles.mobileNav}>
                    {itemsForMenu.map((r) => (
                        <NavLink
                            key={r.path}
                            to={r.path}
                            className={({ isActive }) =>
                                `${styles.mobileNavLink} ${
                                    isActive ? styles.active : ""
                                }`
                            }
                            onClick={closeMobileMenu}
                        >
                            {r.label}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    );
}
