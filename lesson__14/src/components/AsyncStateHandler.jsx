import { useMemo } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

const AsyncStateHandler = ({ 
    isLoading, 
    error, 
    children, 
    loadingMessage = "Завантаження...",
    errorMessage = "Помилка завантаження",
    showError = true 
}) => {
    const content = useMemo(() => {
        try {
            if (isLoading) {
                return <LoadingSpinner message={loadingMessage} />;
            }
            
            if (error && showError) {
                return <div className="error">{errorMessage}</div>;
            }
            
            return children;
        } catch (err) {
            console.error("Помилка в AsyncStateHandler:", err);
            return <div className="error">Неочікувана помилка</div>;
        }
    }, [isLoading, error, children, loadingMessage, errorMessage, showError]);

    return content;
};

export default AsyncStateHandler; 