import React from 'react';
import styles from './ErrorMessage.module.scss';

export const ErrorMessage = ({ error, onRetry }) => {
    const isRateLimitError = error?.status === 429 || 
                           error?.message?.includes('ліміт запитів') ||
                           error?.message?.includes('429');

    return (
        <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>
                {isRateLimitError ? '⏰' : '❌'}
            </div>
            <h3 className={styles.errorTitle}>
                {isRateLimitError ? 'Перевищено ліміт запитів' : 'Помилка завантаження'}
            </h3>
            <p className={styles.errorMessage}>
                {error?.message || 'Сталася невідома помилка'}
            </p>
            {isRateLimitError && (
                <div className={styles.rateLimitInfo}>
                    <p>Це обмеження безкоштовного плану Firebase.</p>
                    <p>Спробуйте пізніше або оновіть сторінку.</p>
                </div>
            )}
            {onRetry && (
                <button 
                    className={styles.retryButton}
                    onClick={onRetry}
                    disabled={isRateLimitError}
                >
                    {isRateLimitError ? 'Спробувати пізніше' : 'Спробувати знову'}
                </button>
            )}
        </div>
    );
}; 