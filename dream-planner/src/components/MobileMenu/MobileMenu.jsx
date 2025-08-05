import React, { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { routes } from "@/app/router";
import styles from "./MobileMenu.module.scss";
const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleLinkClick = () => {
        setIsOpen(false);
    };
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);
    const menuItems = routes[0].children.filter((route) => route.meta?.label);
    return (
        <div className={styles.mobileMenuContainer}>
            <button
                className={`${styles.burgerButton} ${
                    isOpen ? styles.active : ""
                }`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div
                className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}
            >
                <nav className={styles.mobileNav}>
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
                                animationDelay: `${index * 0.1}s`
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
