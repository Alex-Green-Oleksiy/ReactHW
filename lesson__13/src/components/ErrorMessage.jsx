import React from 'react';

const ErrorMessage = ({ 
    title = "Помилка", 
    message, 
    onRetry, 
    onClose,
    showDetails = false,
    error 
}) => {
    return (
        <div className="card post-card--error">
            <h3>{title}</h3>
            <p>{message}</p>
            
            {showDetails && error && (
                <details style={{ whiteSpace: 'pre-wrap', marginTop: 16 }}>
                    <summary>Деталі помилки</summary>
                    {error?.data?.message || error?.error || error?.toString()}
                </details>
            )}
            
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                {onRetry && (
                    <button onClick={onRetry}>
                        Спробувати ще раз
                    </button>
                )}
                {onClose && (
                    <button onClick={onClose}>
                        Закрити
                    </button>
                )}
            </div>
        </div>
    );
};

export default ErrorMessage; 