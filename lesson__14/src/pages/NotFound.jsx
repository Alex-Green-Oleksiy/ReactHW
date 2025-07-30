import { Link } from "react-router-dom";
import "@/pages/NotFound.css";

const NotFound = () => {
    return (
        <div className="not-found">
            <div className="not-found-content">
                <div className="error-code">404</div>
                <h1>Сторінку не знайдено</h1>
                <p>
                    Вибачте, сторінка, яку ви шукаєте, не існує або була
                    переміщена.
                </p>
                <div className="not-found-actions">
                    <Link to="/" className="btn btn-primary">
                        Повернутися на головну
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="btn btn-outline"
                    >
                        Назад
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
