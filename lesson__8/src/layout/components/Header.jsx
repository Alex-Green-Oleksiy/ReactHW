import { NavLink } from "react-router";
import styles from "@/styles/layout/Header.module.scss";
import frontRoutes from "@/routes/frontRoutes";
function Header() {
    return (
        <header className={styles.container}>
            <NavLink
                to={frontRoutes.navigate.home}
                className={({ isActive }) => (isActive ? styles.active : "")}
            >
                Home
            </NavLink>

            <NavLink
                to={frontRoutes.navigate.teachers.index}
                className={({ isActive }) => (isActive ? styles.active : "")}
            >
                Вчителі
            </NavLink>

            <NavLink
                to={frontRoutes.navigate.meeting}
                className={({ isActive }) => (isActive ? styles.active : "")}
            >
                Збори
            </NavLink>

            <NavLink
                to={frontRoutes.navigate.aboutApp}
                className={({ isActive }) => (isActive ? styles.active : "")}
            >
                Про додаток
            </NavLink>

            <NavLink
                to={frontRoutes.navigate.aboutDev}
                className={({ isActive }) => (isActive ? styles.active : "")}
            >
                Про розробників
            </NavLink>
        </header>
    );
}

export default Header;
