import { useState, useEffect } from 'react';
import styles from './Task3.module.css';
import { WORDS } from './constants';
import WordCard from './components/WordCard';
import WordInput from './components/WordInput';

function Task3() {
  const [currentWord, setCurrentWord] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  //  нове випадкове слово
  const getNewWord = () => {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    setCurrentWord(WORDS[randomIndex]);
    setShowFeedback(false);
    setIsCorrect(false);
  };

  // перше слово при завантаженні
  useEffect(() => {
    getNewWord();
  }, []);

  if (!currentWord) {
    return (
      <div className={styles.container}>
        <h2>Вчимо англійські слова</h2>
        <p>Завантаження...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Вчимо англійські слова</h2>
      <WordCard word={currentWord.word} image={currentWord.image}>
        <WordInput 
          onCheck={(userAnswer) => {
            const correct = userAnswer.toLowerCase() === currentWord.translation.toLowerCase();
            setShowFeedback(true);
            setIsCorrect(correct);
            if (correct) {
              setTimeout(getNewWord, 1000);
            }
          }}
          disabled={showFeedback}
        />
        
        {showFeedback && (
          <div 
            className={`${styles.feedback} ${isCorrect ? styles.correct : styles.incorrect}`}
            role="alert"
          >
            {isCorrect ? '✅ Вірно!' : `❌ Не вірно. Правильна відповідь: ${currentWord.translation}`}
          </div>
        )}
      </WordCard>
    </div>
  );
}

export default Task3;
