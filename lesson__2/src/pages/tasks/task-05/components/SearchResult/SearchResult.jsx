import styles from '../../Task5.module.css';

function SearchResult({ item }) {
  return (
    <div className={`${styles.result} ${item.isAd ? styles.ad : ''}`}>
      {item.isAd && <div className={styles.adBadge}>Реклама</div>}
      <h3 className={styles.title}>
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          {item.title}
        </a>
      </h3>
      <div className={styles.url}>{item.url}</div>
      <p className={styles.snippet}>{item.snippet}</p>
    </div>
  );
}

export default SearchResult;
