import { TICKET_CLASSES } from '../../constants';
import styles from '../../Task2.module.css';

function TicketClassSelector({ selectedClass, onChange }) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor="ticket-class">
        Оберіть клас квитка:
        <select
          id="ticket-class"
          value={selectedClass}
          onChange={onChange}
          className={styles.select}
        >
          <option value="">Оберіть клас</option>
          <option value={TICKET_CLASSES.BUSINESS}>Бізнес-клас</option>
          <option value={TICKET_CLASSES.ECONOMY}>Економ-клас</option>
        </select>
      </label>
    </div>
  );
}

export default TicketClassSelector;
