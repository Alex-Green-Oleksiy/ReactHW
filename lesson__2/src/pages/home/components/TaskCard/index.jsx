import React from 'react';
import PropTypes from 'prop-types';
import styles from './TaskCard.module.css';

const TaskCard = ({ task, onClick }) => {
  const handleClick = () => {
    onClick(task.id);
  };

  return (
    <div className={styles.taskCard} onClick={handleClick}>
      <h3 className={styles.title}>{task.title}</h3>
      <p className={styles.description}>{task.description}</p>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TaskCard;
