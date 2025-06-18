import PropTypes from 'prop-types';

const Tab = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`tab ${isActive ? 'active' : ''}`}
      onClick={onClick}
      role="tab"
      aria-selected={isActive}
    >
      {label}
    </button>
  );
};

Tab.propTypes = {
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func
};

Tab.defaultProps = {
  isActive: false,
  onClick: () => {}
};

export default Tab;
