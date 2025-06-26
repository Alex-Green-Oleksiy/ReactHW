import React from "react";
import useWindowSize from "../useWindowSize";
import styles from "./WindowSizeTask3.module.css";
import DeviceIcon from "./DeviceIcon";

export default function WindowSizeTask3() {
    const { width, height } = useWindowSize();

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Задача 3: useWindowSize</h2>
            <div className={styles.sizes}>
                {width} x {height}
            </div>
            <div>
                <DeviceIcon width={width} />
            </div>
            <div className={styles.device}>
                {width >= 1024
                    ? "Монітор"
                    : width >= 600
                    ? "Планшет"
                    : "Телефон"}
            </div>
        </div>
    );
}
