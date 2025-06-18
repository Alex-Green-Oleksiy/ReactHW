import { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import './Tabs.css';

const Tabs = ({ children, activeTab, onChange }) => {
  return (
    <div className="tabs">
      <div className="tabs-header">
        {Children.map(children, (child, index) => (
          cloneElement(child, {
            isActive: index === activeTab,
            onClick: () => onChange(index)
          })
        ))}
      </div>
      <div className="tabs-content">
        {Children.toArray(children)[activeTab]?.props.children}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  activeTab: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Tabs;
