import { useState } from 'react';
import './TemperatureDisplay.css';

const TemperatureDisplay = () => {
  const [temperature, setTemperature] = useState('');
  const [bgColor, setBgColor] = useState('white');

  const getTemperatureClass = (temp) => {
    if (temp === '') return '';
    const numTemp = parseFloat(temp);
    
    if (isNaN(numTemp)) return 'invalid';
    if (numTemp < 0) return 'cold';
    if (numTemp <= 10) return 'cool';
    if (numTemp <= 22) return 'moderate';
    return 'hot';
  };

  const handleTemperatureChange = (e) => {
    const value = e.target.value;
    // Дозволяємо тільки цифри, мінус і крапку
    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
      setTemperature(value);
      
      // Оновлюємо колір фону
      const numTemp = parseFloat(value);
      if (isNaN(numTemp)) {
        setBgColor('white');
      } else if (numTemp < 0) {
        setBgColor('white');
      } else if (numTemp <= 10) {
        setBgColor('lightblue');
      } else if (numTemp <= 22) {
        setBgColor('lightgreen');
      } else {
        setBgColor('lightcoral');
      }
    }
  };

  const temperatureClass = getTemperatureClass(temperature);
  const displayValue = temperature === '' ? '' : parseFloat(temperature);

  return (
    <div className={`temperature-container ${temperatureClass}`} style={{ backgroundColor: bgColor }}>
      <h2>Відображення температури</h2>
      <div className="input-group">
        <label htmlFor="temperature">Температура (°C):</label>
        <input
          id="temperature"
          type="text"
          value={temperature}
          onChange={handleTemperatureChange}
          placeholder="Введіть температуру"
          className={temperatureClass}
        />
      </div>
      
      {temperature !== '' && !isNaN(parseFloat(temperature)) && (
        <div className="temperature-display">
          <p>Поточна температура: <strong>{displayValue}°C</strong></p>
          <div className="temperature-status">
            {temperatureClass === 'cold' && '❄️ Дуже холодно'}
            {temperatureClass === 'cool' && '⛄ Прохолодно'}
            {temperatureClass === 'moderate' && '🌱 Приємно'}
            {temperatureClass === 'hot' && '☀️ Спека'}
            {temperatureClass === 'invalid' && '❌ Невірний формат'}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemperatureDisplay;
