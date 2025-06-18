import styles from '../../Task2.module.css';

function ServiceCheckbox({ id, label, checked, onChange, disabled = false }) {
  return (
    <label className={styles.option}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      {label}
    </label>
  );
}

export default ServiceCheckbox;
