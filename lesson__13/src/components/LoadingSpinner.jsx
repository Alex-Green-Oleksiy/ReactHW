import React from 'react';

const LoadingSpinner = ({ 
    message = "Завантаження...", 
    size = "medium",
    showSpinner = true 
}) => {
    const sizeClasses = {
        small: { width: 16, height: 16, fontSize: '0.9em' },
        medium: { width: 24, height: 24, fontSize: '1em' },
        large: { width: 32, height: 32, fontSize: '1.1em' }
    };

    const currentSize = sizeClasses[size] || sizeClasses.medium;

    return (
        <div className="card" style={{ textAlign: 'center', padding: '20px' }}>
            {showSpinner && (
                <div 
                    style={{
                        width: currentSize.width,
                        height: currentSize.height,
                        border: `3px solid var(--color-border)`,
                        borderTop: `3px solid var(--color-accent)`,
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 16px auto'
                    }}
                />
            )}
            <p style={{ 
                fontSize: currentSize.fontSize,
                margin: 0,
                color: 'var(--color-fg)'
            }}>
                {message}
            </p>
        </div>
    );
};

export default LoadingSpinner; 