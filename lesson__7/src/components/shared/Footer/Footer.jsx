export default function Footer() {
    return (
        <footer
            style={{
                textAlign: "center",
                padding: "1rem",
                background: "#181818",
                color: "#fff",
                borderTop: "2px solid #b91c1c",
                fontWeight: 700,
                letterSpacing: 1,
                fontSize: 18
            }}
        >
            <small>
                &copy; {new Date().getFullYear()}{" "}
                <span style={{ color: "#b91c1c" }}>Магазинчик Штурвал</span>
            </small>
        </footer>
    );
}
