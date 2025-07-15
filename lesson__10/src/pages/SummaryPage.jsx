import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { useTravel } from "@/context/TravelContext";
import styles from "@/styles/pages/SummaryPage.module.css";
import Button from "@/components/Button";
import { BUSES, HOTELS } from "@/data/travelData";
import { useNavigate } from "react-router-dom";

const SummaryPage = () => {
    const { theme } = useTheme();
    const { selectedBuses, selectedHotels, removeBus, removeHotel } =
        useTravel();
    const navigate = useNavigate();
    return (
        <div
            className={
                styles.container + " " + (theme === "dark" ? "dark" : "light")
            }
        >
            <h2 className={styles.h2}>Підсумок вибору</h2>
            <div>
                <h3 className={styles.h3}>Вибрані автобуси:</h3>
                <ul className={styles.list}>
                    {selectedBuses.length === 0 && (
                        <>
                            <li>Не вибрано жодного автобуса</li>
                            <li>
                                <Button
                                className={styles.removeBtn} 
                                onClick={() => navigate("/")}>
                                    Перейти до вибору автобусів
                                </Button>
                            </li>
                        </>
                    )}
                    {selectedBuses.map((id) => {
                        const bus = BUSES.find((b) => b.id === id);
                        return (
                            <li key={id} className={styles.item}>
                                {bus ? bus.name : id}
                                {/* Кнопка для видалення автобуса */}
                                <Button
                                    className={styles.removeBtn}
                                    onClick={() => removeBus(id)}
                                >
                                    Видалити
                                </Button>
                            </li>
                        );
                    })}
                </ul>
                <h3 className={styles.h3}>Вибрані готелі:</h3>
                <ul className={styles.list}>
                    {selectedHotels.length === 0 && (
                        <>
                            <li>Не вибрано жодного готелю</li>
                            <li>
                                <Button className={styles.removeBtn}
                                 onClick={() => navigate("/hotels")}>
                                    Перейти до вибору готелів
                                </Button>
                            </li>
                        </>
                    )}
                    {selectedHotels.map((id) => {
                        const hotel = HOTELS.find((h) => h.id === id);
                        return (
                            <li key={id} className={styles.item}>
                                {hotel ? hotel.name : id}
                                {/* Кнопка для видалення готелю */}
                                <Button
                                    className={styles.removeBtn}
                                    onClick={() => removeHotel(id)}
                                >
                                    Видалити
                                </Button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};
export default SummaryPage;
