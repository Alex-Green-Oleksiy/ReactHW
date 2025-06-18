import React from 'react';
import './ResultItem.css';

const ResultItem = ({ label, value, unit }) => {
  return (
    <div className="result-item">
      <span className="result-label">{label}:</span>
      <span className="result-value">
        {value.toFixed(unit === 'м' ? 2 : 5)} {unit}
      </span>
    </div>
  );
};

export default ResultItem;
