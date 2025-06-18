import { useState } from 'react';
import styles from '../../Task3.module.css';

function WordInput({ onCheck, disabled }) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim()) {
      onCheck(answer);
      setAnswer('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={handleKeyDown}
          className={styles.input}
          placeholder="Введіть переклад..."
          autoFocus
          aria-label="Переклад слова"
          disabled={disabled}
        />
        <button 
          type="submit" 
          className={styles.button}
          disabled={!answer.trim() || disabled}
        >
          Перевірити
        </button>
      </div>
    </form>
  );
}

export default WordInput;
