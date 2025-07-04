import { NavLink } from "react-router-dom";
import { useState } from "react";
import styles from "@/styles/layout/Header.module.scss";
import frontRoutes from "@/routes/frontRoutes";

function Header() {
    const [open, setOpen] = useState(false);
    return (
        <header className={styles.container}>
            {open && (
                <div
                    className={styles.menuOverlay}
                    onClick={() => setOpen(false)}
                />
            )}
            <nav className={`${styles.navLinks} ${open ? styles.open : ""}`}>
                <NavLink
                    to={frontRoutes.navigate.home}
                    className={({ isActive }) =>
                        isActive ? styles.active : ""
                    }
                    onClick={() => setOpen(false)}
                >
                    Home
                </NavLink>

                <NavLink
                    to={frontRoutes.navigate.teachers.index}
                    className={({ isActive }) =>
                        isActive ? styles.active : ""
                    }
                    onClick={() => setOpen(false)}
                >
                    Вчителі
                </NavLink>

                <NavLink
                    to={frontRoutes.navigate.meeting}
                    className={({ isActive }) =>
                        isActive ? styles.active : ""
                    }
                    onClick={() => setOpen(false)}
                >
                    Збори
                </NavLink>

                <NavLink
                    to={frontRoutes.navigate.aboutApp}
                    className={({ isActive }) =>
                        isActive ? styles.active : ""
                    }
                    onClick={() => setOpen(false)}
                >
                    Про додаток
                </NavLink>

                <NavLink
                    to={frontRoutes.navigate.aboutDev}
                    className={({ isActive }) =>
                        isActive ? styles.active : ""
                    }
                    onClick={() => setOpen(false)}
                >
                    Про розробників
                </NavLink>
            </nav>
            <div
                className={`${styles.burger} ${open ? styles.open : ""}`}
                onClick={() => setOpen((v) => !v)}
            >
                <span />
            </div>
        </header>
    );
}

export default Header;
