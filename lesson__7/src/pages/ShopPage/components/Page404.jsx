import LoadingSpinner from "./LoadingSpinner";
import styles from "../../../styles/ShopPage.module.css";

export default function Page404() {
    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100vw",
                background: "#181818",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                textAlign: "center"
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    opacity: 0.08,
                    zIndex: 0
                }}
            >
                <LoadingSpinner size={340} hideText={true} />
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
                <h1
                    style={{
                        fontSize: 120,
                        color: "#b91c1c",
                        fontWeight: 900,
                        letterSpacing: 8,
                        marginBottom: 24,
                        textShadow: "0 4px 32px #000a"
                    }}
                >
                    404
                </h1>
                <div
                    style={{
                        fontSize: 32,
                        color: "#fff",
                        fontWeight: 700,
                        marginBottom: 24
                    }}
                >
                    Сторінку не знайдено
                    <br />
                    <span style={{ color: "#f97316" }}>
                        Іди крути штурвал, ти не один!
                    </span>{" "}
                    <span style={{ fontSize: 40 }}>😅</span>
                </div>
            </div>
        </div>
    );
}
