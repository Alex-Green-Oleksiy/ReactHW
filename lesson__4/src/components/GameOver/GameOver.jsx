import React from 'react';
import styles from './GameOver.module.scss';

function GameOver({ winner, onRestart }) {
    return (
        <div className={styles.gameOver}>
            <h2>Гра завершена!</h2>
            <p>Переможець: Гравець {winner}</p>
            <button className={styles.gameOverBtn} onClick={onRestart}>
                Грати знову
            </button>
        </div>
    );
}

export default GameOver;
