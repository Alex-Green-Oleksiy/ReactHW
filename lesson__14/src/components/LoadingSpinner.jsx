import "@/components/LoadingSpinner.css";

const LoadingSpinner = ({ message = "Завантаження..." }) => {
    return (
        <div className="loading-spinner-overlay">
            <div className="loading-spinner-content">
                <div className="spinner"></div>
                <p className="loading-message">{message}</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
