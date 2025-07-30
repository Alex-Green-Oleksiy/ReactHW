import { useState, useEffect } from "react";
import BurgerMenu from "@/components/navigation/BurgerMenu";
import Navigation from "@/components/navigation/Navigation";
import MobileMenu from "@/components/navigation/MobileMenu";
import "@/components/navigation/Header.css";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // закриваю меню коли змінюється розмір вікна
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 767) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // закриваю меню коли клікаю поза ним і блокуємо скрол
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && !event.target.closest(".header")) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener("click", handleClickOutside);
            document.body.classList.add("menu-open");
        } else {
            document.body.classList.remove("menu-open");
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
            document.body.classList.remove("menu-open");
        };
    }, [isMenuOpen]);

    return (
        <header className="header">
            <div className="header-content">
                <h1 className="logo">🏥 EMR Система</h1>

                <BurgerMenu isOpen={isMenuOpen} onClick={toggleMenu} />

                <Navigation />
            </div>

            {/* мобільне меню */}
            <MobileMenu isOpen={isMenuOpen} onLinkClick={closeMenu} />
        </header>
    );
};

export default Header;
