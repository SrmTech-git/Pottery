import React from 'react';
import './Button.css';

/**
 * Button Component
 *
 * A reusable button component with different variants.
 *
 * @param {Object} props - Component props
 * @param {string} props.children - Button text or content
 * @param {function} props.onClick - Click handler function
 * @param {string} props.variant - Button style: 'primary', 'secondary', or 'danger'
 * @param {boolean} props.disabled - Whether button is disabled
 */
function Button({ children, onClick, variant = 'primary', disabled = false }) {
  const getButtonClass = () => {
    const baseClass = 'btn';
    const variantClass = `btn-${variant}`;
    return `${baseClass} ${variantClass}`;
  };

  return (
    <button
      className={getButtonClass()}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
