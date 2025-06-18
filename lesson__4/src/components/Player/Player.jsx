import React from 'react';
import styles from './Player.module.scss';

function Player({ playerNumber, value, onChange, onMove, disabled, numbers, isActive, error }) {
    const displayNumbers = [0, 1, 2, 3, 4].map((idx) =>
        numbers[idx] !== undefined ? numbers[idx] : '_'
    );

    return (
        <div className={`${styles.player} ${isActive ? styles.active : ''}`}>
            <h3>{`Гравець ${playerNumber}`}</h3>
            <div className={styles.playerNumbers}>
                {displayNumbers.map((num, idx) => (
                    <span key={idx} className={styles.number}>
                        {num}
                    </span>
                ))}
            </div>
            <div className={styles.inputGroup}>
                <label>
                    Цифра
                    <input
                        type="text"
                        value={value}
                        onChange={onChange}
                        maxLength={1}
                        className={styles.numberInput}
                        disabled={!isActive}
                    />
                </label>
                <div className={styles.inputError} style={{ minHeight: 18 }}>
                    {error || ''}
                </div>
                <button
                    className={styles.moveButton}
                    onClick={onMove}
                    disabled={!isActive || disabled || !value}
                >
                    Зробити хід
                </button>
            </div>
        </div>
    );
}

export default Player;
