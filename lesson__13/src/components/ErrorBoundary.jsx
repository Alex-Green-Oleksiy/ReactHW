import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    // eslint-disable-next-line no-unused-vars
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });

        // Логування помилки
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="card post-card--error">
                    <h3>Щось пішло не так</h3>
                    <p>Сталася неочікувана помилка в додатку</p>
                    <details style={{ whiteSpace: "pre-wrap", marginTop: 16 }}>
                        <summary>Деталі помилки</summary>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                    <button
                        onClick={() => window.location.reload()}
                        style={{ marginTop: 16 }}
                    >
                        Перезавантажити сторінку
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
