import "@/components/navigation/BurgerMenu.css";

const BurgerMenu = ({ isOpen, onClick, ariaLabel = "Відкрити меню" }) => {
    return (
        <button
            className={`burger-menu ${isOpen ? "active" : ""}`}
            onClick={onClick}
            aria-label={ariaLabel}
        >
            <span></span>
            <span></span>
            <span></span>
        </button>
    );
};

export default BurgerMenu;
