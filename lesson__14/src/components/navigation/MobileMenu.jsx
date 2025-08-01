import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { NAVIGATION_LINKS } from "@/constants/navigation";
import styles from "./MobileMenu.module.css";

const MobileMenu = ({ isOpen, onLinkClick }) => {
    const navLinks = NAVIGATION_LINKS;
    const location = useLocation();

    const handleClick = () => {
        if (onLinkClick) {
            onLinkClick();
        }
    };

    const isActiveLink = (path) => {
        if (path === "/") {
            return location.pathname === "/";
        }
        return location.pathname.startsWith(path);
    };

    return (
        <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}>
            <nav className={styles.nav}>
                {navLinks.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`${styles.navLink} ${
                            isActiveLink(link.path) ? styles.active : ""
                        }`}
                        onClick={handleClick}
                    >
                        {link.label}
                    </Link>
                ))}
                <div className={styles.themeToggle}>
                    <ThemeToggle />
                </div>
            </nav>
        </div>
    );
};

export default MobileMenu;
