import { useState } from 'react';
import styles from '../../Task2.module.css';
import { ServiceCheckbox } from '../common';

function BusinessServices({ services, onServicesChange }) {
  const [cognac, setCognac] = useState(false);
  const [snack, setSnack] = useState(false);

  const handleCognacChange = (e) => {
    const isChecked = e.target.checked;
    setCognac(isChecked);
    if (!isChecked) {
      setSnack(false);
      onServicesChange('snack', false);
    }
    onServicesChange('cognac', isChecked);
  };

  const handleSnackChange = (e) => {
    const isChecked = e.target.checked;
    setSnack(isChecked);
    onServicesChange('snack', isChecked);
  };

  return (
    <div className={styles.services}>
      <h3>Бізнес послуги</h3>
      <p>Оберіть бажані послуги:</p>
      <div className={styles.optionsGroup}>
        <ServiceCheckbox
          id="newspaper"
          label="Газета"
          checked={services.newspaper || false}
          onChange={(e) => onServicesChange('newspaper', e.target.checked)}
        />
        <ServiceCheckbox
          id="cognac"
          label="Коньяк"
          checked={cognac}
          onChange={handleCognacChange}
        />
        {cognac && (
          <div className={styles.snackOption}>
            <ServiceCheckbox
              id="snack"
              label="Додати закуску до коньяку?"
              checked={snack}
              onChange={handleSnackChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default BusinessServices;
