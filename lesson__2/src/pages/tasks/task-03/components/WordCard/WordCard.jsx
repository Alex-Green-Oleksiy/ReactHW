import styles from '../../Task3.module.css';

function WordCard({ word, image, children }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={image} 
          alt={word} 
          className={styles.image}
          loading="lazy"
        />
      </div>
      <p className={styles.word}>{word}</p>
      {children}
    </div>
  );
}

export default WordCard;
