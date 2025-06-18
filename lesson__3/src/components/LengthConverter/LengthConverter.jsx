import { useState } from 'react';
import './LengthConverter.css';
import CentimetersInput from './components/CentimetersInput';
import ResultItem from './components/ResultItem';

const LengthConverter = () => {
  const [centimeters, setCentimeters] = useState('');

  // Обчислюємо м і км
  const meters = centimeters ? parseFloat(centimeters) / 100 : 0;
  const kilometers = meters / 1000;

  const handleCentimetersChange = (value) => {
    setCentimeters(value);
  };

  return (
    <div className="length-converter">
      <h2>Конвертер довжини</h2>
      
      <CentimetersInput 
        value={centimeters} 
        onChange={handleCentimetersChange} 
      />
      
      <div className="results">
        <ResultItem 
          label="Метри" 
          value={meters} 
          unit="м" 
        />
        <ResultItem 
          label="Кілометри" 
          value={kilometers} 
          unit="км" 
        />
      </div>
    </div>
  );
};

export default LengthConverter;
