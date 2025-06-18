import React from 'react';
import PropTypes from 'prop-types';
import styles from './Home.module.css';
import { tasks } from './data/tasks';
import Hero from './components/Hero';

const Home = ({ onTaskSelect }) => {
  return (
    <div className={styles.home}>
      <Hero />
      
      <main className={styles.main}>
        <div className={styles.tasksContainer}>
          {tasks.map((task, index) => {
            const cardStyle = index % 2 === 0 ? styles.taskCardRed : styles.taskCardOrange;
            
            return (
              <article 
                key={task.id} 
                className={`${styles.taskCard} ${cardStyle}`}
                onClick={() => onTaskSelect(task.id)}
              >
                <div className={styles.taskContent}>
                  <div className={styles.taskNumber}>Завдання {task.id}</div>
                  <h2 className={styles.taskTitle}>{task.title}</h2>
                  <p className={styles.taskDescription}>{task.description}</p>
                  <div className={styles.taskFooter}>
                    <button className={styles.taskButton}>Почати</button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>
      
      <footer className={styles.footer}>
        <p> 2025. Всі права захищені.</p>
      </footer>
    </div>
  );
};

Home.propTypes = {
  onTaskSelect: PropTypes.func.isRequired,
};

export default Home;
