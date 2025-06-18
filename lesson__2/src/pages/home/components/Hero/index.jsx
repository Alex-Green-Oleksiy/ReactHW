import React from 'react';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <div className={styles.hero}>
      <h1 className={styles.title}>React Tasks</h1>
      <p className={styles.subtitle}>lessons__2</p>
      {/* <p className={styles.intro}>Для перевірки -- дз 1/4/5</p> */}
    </div>
  );
};

export default Hero;
