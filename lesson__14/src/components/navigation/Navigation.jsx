import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { NAVIGATION_LINKS } from "@/constants/navigation";
import "@/components/navigation/Navigation.css";

const Navigation = ({ isMobile = false, onLinkClick }) => {
    const navLinks = NAVIGATION_LINKS;

    const handleClick = () => {
        if (onLinkClick) {
            onLinkClick();
        }
    };

    return (
        <nav className={`nav ${isMobile ? "mobile-nav" : "desktop-nav"}`}>
            {navLinks.map((link) => (
                <Link
                    key={link.path}
                    to={link.path}
                    className="nav-link"
                    onClick={handleClick}
                >
                    {link.label}
                </Link>
            ))}
            {!isMobile && <ThemeToggle />}
            {isMobile && (
                <div className="mobile-theme-toggle">
                    <ThemeToggle />
                </div>
            )}
        </nav>
    );
};

export default Navigation;
