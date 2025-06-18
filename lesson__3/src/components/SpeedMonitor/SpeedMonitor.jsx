import { useState, useEffect } from 'react';
import './SpeedMonitor.css';

const SpeedMonitor = () => {
  const [allowedSpeed, setAllowedSpeed] = useState('');
  const [currentSpeed, setCurrentSpeed] = useState('');
  const [speedStatus, setSpeedStatus] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [inputClass, setInputClass] = useState('');

  // блокування/розблокування поля швидкості
  useEffect(() => {
    if (!allowedSpeed) {
      setCurrentSpeed('');
      setSpeedStatus('');
      setShowWarning(false);
    }
  }, [allowedSpeed]);

  // анімації попередження
  useEffect(() => {
    let interval;
    if (showWarning) {
      interval = setInterval(() => {
        setShowWarning(prev => !prev);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showWarning]);

  const handleAllowedSpeedChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAllowedSpeed(value);
    }
  };

  const handleCurrentSpeedChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setCurrentSpeed(value);
      
      if (allowedSpeed && value) {
        const allowed = parseFloat(allowedSpeed);
        const current = parseFloat(value);
        const percentage = (current / allowed) * 100;
        
        if (percentage < 50) {
          setSpeedStatus('low');
          setShowWarning(false);
        } else if (percentage <= 100) {
          setSpeedStatus('normal');
          setShowWarning(percentage >= 90);
        } else {
          setSpeedStatus('high');
          setShowWarning(true);
        }
      }
    }
  };

  // клас для інпуту поточної швидкості
  useEffect(() => {
    if (!allowedSpeed || !currentSpeed) {
      setInputClass('');
      return;
    }

    const allowed = parseFloat(allowedSpeed);
    const current = parseFloat(currentSpeed);
    const percentage = (current / allowed) * 100;

    if (percentage < 50) {
      setInputClass('low-speed');
    } else if (percentage <= 100) {
      setInputClass('normal-speed');
    } else {
      setInputClass('high-speed');
    }
  }, [allowedSpeed, currentSpeed]);

  return (
    <div className="speed-monitor">
      <h2>Монітор швидкості</h2>
      
      <div className="input-group">
        <label htmlFor="allowed-speed">Дозволена швидкість (км/год):</label>
        <input
          id="allowed-speed"
          type="text"
          value={allowedSpeed}
          onChange={handleAllowedSpeedChange}
          placeholder="Введіть дозволену швидкість"
        />
      </div>
      
      <div className="input-group">
        <label htmlFor="current-speed">Поточна швидкість (км/год):</label>
        <input
          id="current-speed"
          type="text"
          value={currentSpeed}
          onChange={handleCurrentSpeedChange}
          placeholder="Введіть поточну швидкість"
          disabled={!allowedSpeed}
          className={inputClass}
        />
      </div>
      
      {showWarning && (
        <div className={`warning-message ${showWarning ? 'visible' : ''}`}>
          ⚠️ Увага!
        </div>
      )}
      
      <div className="speed-status">
        {speedStatus === 'low' && 'Швидкість нижче 50% від дозволеної'}
        {speedStatus === 'normal' && 'Швидкість у межах норми'}
        {speedStatus === 'high' && 'Перевищено максимальну швидкість!'}
      </div>
      
      {allowedSpeed && currentSpeed && (
        <div className="speed-percentage">
          {Math.round((parseFloat(currentSpeed) / parseFloat(allowedSpeed)) * 100)}% від дозволеної швидкості
        </div>
      )}
    </div>
  );
};

export default SpeedMonitor;
