import styles from "../../../styles/ShopPage.module.css";

export default function LoadingSpinner({
    size = 80,
    noSpin = false,
    hideText = false
}) {
    return (
        <div className={styles.loadingSpinnerWrapper}>
            <svg
                className={noSpin ? "" : styles.steeringLoader}
                width={size}
                height={size}
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g>
                    <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="#b91c1c"
                        strokeWidth="6"
                        fill="#232323"
                    />
                    <circle
                        cx="40"
                        cy="40"
                        r="10"
                        fill="#fff"
                        stroke="#b91c1c"
                        strokeWidth="3"
                    />
                    <rect
                        x="38"
                        y="3"
                        width="4"
                        height="14"
                        rx="2"
                        fill="#f97316"
                    />
                    <rect
                        x="38"
                        y="63"
                        width="4"
                        height="14"
                        rx="2"
                        fill="#f97316"
                    />
                    <rect
                        x="3"
                        y="38"
                        width="14"
                        height="4"
                        rx="2"
                        fill="#f97316"
                    />
                    <rect
                        x="63"
                        y="38"
                        width="14"
                        height="4"
                        rx="2"
                        fill="#f97316"
                    />
                    <rect
                        x="17"
                        y="7"
                        width="4"
                        height="14"
                        rx="2"
                        transform="rotate(-45 9 24)"
                        fill="#b91c1c"
                    />
                    <rect
                        x="59"
                        y="0"
                        width="4"
                        height="14"
                        rx="2"
                        transform="rotate(45 61 24)"
                        fill="#b91c1c"
                    />
                    <rect
                        x="17"
                        y="49"
                        width="4"
                        height="14"
                        rx="2"
                        transform="rotate(-135 19 66)"
                        fill="#b91c1c"
                    />
                    <rect
                        x="59"
                        y="49"
                        width="4"
                        height="14"
                        rx="2"
                        transform="rotate(135 61 66)"
                        fill="#b91c1c"
                    />
                </g>
            </svg>
            {!hideText && (
                <div className={styles.loadingText}>Завантаження...</div>
            )}
        </div>
    );
}
