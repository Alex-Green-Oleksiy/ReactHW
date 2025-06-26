import React from "react";
import styles from "./WindowSizeTask3.module.css";

export default function DeviceIcon({ width }) {
    if (width >= 1024) {
        return (
            <span className={styles.icon} role="img" aria-label="monitor">
                🖥️
            </span>
        );
    } else if (width >= 600) {
        return (
            <span className={styles.icon} role="img" aria-label="tablet">
                💻
            </span>
        );
    } else {
        return (
            <span className={styles.icon} role="img" aria-label="phone">
                📱
            </span>
        );
    }
}
