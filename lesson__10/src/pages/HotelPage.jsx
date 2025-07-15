import React from "react";
import { useTheme } from "@/context/useTheme";
import { useTravel } from "@/context/useTravel";
import styles from "@/styles/pages/HotelPage.module.css";
import { HOTELS } from "@/data/travelData";

const HotelPage = () => {
    const { theme } = useTheme();
    const { selectedHotels, toggleHotel } = useTravel();
    return (
        <div
            className={
                styles.container + " " + (theme === "dark" ? "dark" : "light")
            }
        >
            <h2 className={styles.h2}>Виберіть готелі</h2>
            <ul className={styles.list}>
                {HOTELS.map((hotel) => (
                    <li key={hotel.id} className={styles.item}>
                        {/* Чекбокс для вибору готелю */}
                        <label className={styles.label}>
                            <input
                                type="checkbox"
                                className={styles.checkbox}
                                checked={selectedHotels.includes(hotel.id)}
                                onChange={() => toggleHotel(hotel.id)}
                            />
                            {hotel.name}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default HotelPage;
