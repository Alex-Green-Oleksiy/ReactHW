import { useState, useEffect } from "react";
import Card from "./Card";
import "./WordTranslator.css";

const WORDS = [
    { en: "apple", uk: "яблуко" },
    { en: "dog", uk: "собака" },
    { en: "car", uk: "автомобіль" },
    { en: "sun", uk: "сонце" },
    { en: "tree", uk: "дерево" },
];

const WordTranslator = () => {
    const [cards, setCards] = useState([]);
    const [selected, setSelected] = useState([]);
    const [matched, setMatched] = useState([]);

    useEffect(() => {
        const initialCards = WORDS.flatMap((word, index) => [
            { id: `en-${index}`, text: word.en, pairId: index },
            { id: `uk-${index}`, text: word.uk, pairId: index },
        ]).sort(() => Math.random() - 0.5);
        setCards(initialCards);
    }, []);

    const handleCardClick = (clickedCard) => {
        if (selected.length === 2 || matched.includes(clickedCard.pairId))
            return;

        const newSelected = [...selected, clickedCard];
        setSelected(newSelected);

        if (newSelected.length === 2) {
            if (newSelected[0].pairId === newSelected[1].pairId) {
                setMatched((prev) => [...prev, clickedCard.pairId]);
            }
            setTimeout(() => setSelected([]), 1000);
        }
    };

    return (
        <div className="word-translator">
            <div className="cards">
                {cards
                    .filter((card) => !matched.includes(card.pairId)) // Фільтруємо знайдені пари
                    .map((card) => (
                        <Card
                            key={card.id}
                            card={card}
                            isSelected={selected.some((c) => c.id === card.id)}
                            isMatched={false} // Більше не потрібно, бо ми фільтруємо
                            onClick={() => handleCardClick(card)}
                        />
                    ))}
            </div>
            {matched.length === WORDS.length && (
                <div className="success-message">
                    Вітаємо! Ви знайшли всі пари!
                </div>
            )}
        </div>
    );

};

export default WordTranslator;
