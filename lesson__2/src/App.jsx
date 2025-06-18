import React, { useState } from 'react';
import Home from './pages/Home/Home';
import Task1 from './pages/tasks/task-01/Task1';
import Task2 from './pages/tasks/task-02/Task2';
import Task3 from './pages/tasks/task-03/Task3';
import Task4 from './pages/tasks/task-04/Task4';
import Task5 from './pages/tasks/task-05/Task5';
import Task6 from './pages/tasks/task-06/Task6';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home onTaskSelect={setCurrentView} />;
      case 'task-01':
        return <Task1 />;
      case 'task-02':
        return <Task2 />;
      case 'task-03':
        return <Task3 />;
      case 'task-04':
        return <Task4 />;
      case 'task-05':
        return <Task5 />;
      case 'task-06':
        return <Task6 />;
      default:
        return <Home onTaskSelect={setCurrentView} />;
    }
  };

  return (
    <div className="app">
      <main>
        {renderView()}
      </main>
    </div>
  );
}

export default App;
