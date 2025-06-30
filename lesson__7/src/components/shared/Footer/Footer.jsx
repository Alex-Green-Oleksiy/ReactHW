export default function Footer() {
    return (
        <footer
            style={{
                textAlign: "center",
                padding: "1rem",
                background: "#f3f3f3"
            }}
        >
            <small>© {new Date().getFullYear()} Магазинчик Штурвал</small>
        </footer>
    );
}
