import React from 'react';
import styles from './SecretNumber.module.scss';

function SecretNumber({ guessedNumbers }) {
    return (
        <div className={styles.secretNumber}>
            <h2 className={styles.secretNumberTitle}>Секретне число:</h2>
            <div className={styles.numberDisplay}>
                {guessedNumbers.map((digit, index) => (
                    <span key={index} className={styles.digit}>
                        {digit}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default SecretNumber;
