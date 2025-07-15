import React from "react";
import { useTheme } from "@/context/useTheme";
import { useTravel } from "@/context/useTravel";
import styles from "@/styles/pages/BusPage.module.css";
import { BUSES } from "@/data/travelData";

const BusPage = () => {
    const { theme } = useTheme();
    const { selectedBuses, toggleBus } = useTravel();
    return (
        <div
            className={
                styles.container + " " + (theme === "dark" ? "dark" : "light")
            }
        >
            <h2 className={styles.h2}>Виберіть автобуси</h2>
            <ul className={styles.list}>
                {BUSES.map((bus) => (
                    <li key={bus.id} className={styles.item}>
                        {/* Чекбокс для вибору автобуса */}
                        <label className={styles.label}>
                            <input
                                type="checkbox"
                                className={styles.checkbox}
                                checked={selectedBuses.includes(bus.id)}
                                onChange={() => toggleBus(bus.id)}
                            />
                            {bus.name}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default BusPage;
