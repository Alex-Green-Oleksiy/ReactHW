import { useState } from 'react';
import styles from '../../Task2.module.css';
import { ServiceCheckbox } from '../common';

function EconomyServices({ services, onServicesChange }) {
  const [beerType, setBeerType] = useState('light');

  const handleBeerTypeChange = (e) => {
    const type = e.target.value;
    setBeerType(type);
    onServicesChange('beerType', type);
  };

  return (
    <div className={styles.services}>
      <h3>Економ послуги</h3>
      <p>Оберіть бажані напої та закуски:</p>
      <div className={styles.optionsGroup}>
        <div className={styles.formGroup}>
          <label htmlFor="beer-type" className={styles.selectLabel}>
            Види пива:
          </label>
          <select
            id="beer-type"
            value={beerType}
            onChange={handleBeerTypeChange}
            className={styles.select}
          >
            <option value="light">Світле</option>
            <option value="dark">Темне</option>
            <option value="wheat">Пшеничне</option>
          </select>
        </div>
        
        <ServiceCheckbox
          id="chips"
          label="Чіпси"
          checked={services.chips || false}
          onChange={(e) => onServicesChange('chips', e.target.checked)}
        />
      </div>
    </div>
  );
}

export default EconomyServices;
