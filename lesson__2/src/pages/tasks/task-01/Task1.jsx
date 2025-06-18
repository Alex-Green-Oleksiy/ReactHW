import { useState } from 'react';
import styles from './Task1.module.css';
import { CORRECT_LOGIN, CORRECT_PASSWORD, MESSAGES } from './constants';

function Task1() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState({ message: '', isIvan: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Перевірка логіну та пароля
    if (login === CORRECT_LOGIN && password === CORRECT_PASSWORD) {
      setIsLoggedIn(true);
      setError({ message: '', isIvan: false });
    } else if (login === CORRECT_LOGIN) {
      // Помилка для Івана (синій колір)
      setError({ message: MESSAGES.IVAN_ERROR, isIvan: true });
    } else {
      // Помилка для інших (червоний колір)
      setError({ message: MESSAGES.ERROR, isIvan: false });
    }
  };

  // Обробники зміни полів форми
  const handleLoginChange = (e) => {
    setLogin(e.target.value);
    // Скидаємо помилку при зміні логіну
    if (error.message) setError({ message: '', isIvan: false });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Скидаємо помилку при зміні паролю
    if (error.message) setError({ message: '', isIvan: false });
  };

  return (
    <div className={styles.container}>
      <h2>Вхід</h2>
      
      {isLoggedIn ? (
        <div className={styles.success}>
          <div className={styles.smiley}>{MESSAGES.SUCCESS}</div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          {error.message && (
            <div className={`${styles.error} ${error.isIvan ? styles.ivanError : ''}`}>
              {error.message}
            </div>
          )}
          
          <div className={styles.inputGroup}>
            <label>
              Логін:
              <input
                type="text"
                value={login}
                onChange={handleLoginChange}
                className={styles.input}
              />
            </label>
          </div>
          
          <div className={styles.inputGroup}>
            <label>
              Пароль:
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className={styles.input}
              />
            </label>
          </div>
          
          <button type="submit" className={styles.button}>
            Увійти
          </button>
        </form>
      )}
    </div>
  );
}

export default Task1;
