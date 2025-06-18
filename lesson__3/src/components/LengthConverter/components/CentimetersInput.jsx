import React from 'react';
import './CentimetersInput.css';

const CentimetersInput = ({ value, onChange }) => {
  const handleChange = (e) => {
    const inputValue = e.target.value;
    // Дозволяємо тільки цифри та крапку, і перевіряємо на коректність числа
    if (inputValue === '' || /^\d*\.?\d*$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

  return (
    <div className="input-group">
      <label htmlFor="centimeters">Довжина у сантиметрах:</label>
      <input
        id="centimeters"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Введіть довжину в см"
      />
    </div>
  );
};

export default CentimetersInput;
