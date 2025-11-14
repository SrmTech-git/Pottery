import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.css';

/**
 * ThemeToggle Component
 *
 * Elegant toggle switch for switching between light and dark mode
 * Uses FontAwesome icons for sun and moon
 */
function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className={`toggle-track ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="toggle-thumb">
          <FontAwesomeIcon
            icon={isDarkMode ? faMoon : faSun}
            className="toggle-icon"
          />
        </div>
      </div>
    </button>
  );
}

export default ThemeToggle;
