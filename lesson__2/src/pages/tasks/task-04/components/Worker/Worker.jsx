import styles from '../../Task4.module.css';

function Worker({ worker, formatSalary }) {
  return (
    <li className={styles.workerItem}>
      <span className={styles.workerName}>{worker.name}</span>
      <span className={styles.salary}>
        {formatSalary(worker.salary)}
      </span>
    </li>
  );
}

export default Worker;
