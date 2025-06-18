import { useState } from 'react';
import { TICKET_CLASSES, INITIAL_SERVICES } from './constants';
import styles from './Task2.module.css';
import TicketClassSelector from './components/TicketClassSelector';
import BusinessServices from './components/BusinessServices';
import EconomyServices from './components/EconomyServices';

function Task2() {
  const [ticketClass, setTicketClass] = useState('');
  const [services, setServices] = useState(INITIAL_SERVICES);

  // Обробник зміни класу квитка
  const handleClassChange = (e) => {
    setTicketClass(e.target.value);
    // Скидаємо всі послуги при зміні класу
    setServices(INITIAL_SERVICES);
  };

  // Обробник зміни стану послуг
  const handleServiceChange = (service, value) => {
    setServices(prev => ({
      ...prev,
      [service]: value
    }));
  };

  // Визначаємо клас контейнера в залежності від вибраного класу квитка
 
  const containerClass = ticketClass 
    ? `${styles.container} ${styles[ticketClass]}`
    : styles.container;

  return (
    <div className={containerClass}>
      <h2>Вибір послуг на рейсі</h2>
      
      <TicketClassSelector 
        selectedClass={ticketClass}
        onChange={handleClassChange}
      />

      {/* Відображаємо відповідні послуги залежно від класу квитка */}
      {ticketClass === TICKET_CLASSES.BUSINESS && (
        <BusinessServices 
          services={services}
          onServicesChange={handleServiceChange}
        />
      )}

      {ticketClass === TICKET_CLASSES.ECONOMY && (
        <EconomyServices 
          services={services}
          onServicesChange={handleServiceChange}
        />
      )}
    </div>
  );
}

export default Task2;
