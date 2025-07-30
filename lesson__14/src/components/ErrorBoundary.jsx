import { Component } from "react";
import "@/components/ErrorBoundary.css";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorInfo: null };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            errorInfo: errorInfo
        });

        // тут можна було б відправити помилку в сервіс логування
        console.error("Error caught by boundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <div className="error-content">
                        <h2>😵 Щось пішло не так</h2>
                        <p>Вибачте, сталася неочікувана помилка.</p>
                        <button
                            className="btn btn-primary"
                            onClick={() => window.location.reload()}
                        >
                            Перезавантажити сторінку
                        </button>

                        {typeof process !== "undefined" &&
                            process.env.NODE_ENV === "development" &&
                            this.state.errorInfo && (
                                <details className="error-details">
                                    <summary>
                                        Деталі помилки (тільки для розробки)
                                    </summary>
                                    <pre>
                                        {this.state.errorInfo.componentStack}
                                    </pre>
                                </details>
                            )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
