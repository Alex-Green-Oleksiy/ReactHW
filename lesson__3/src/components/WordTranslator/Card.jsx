const Card = ({ card, isSelected, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`card ${isSelected ? "selected" : ""}`}
        >
            {card.text}
        </button>
    );
};

export default Card;
