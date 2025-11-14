import React from 'react';
import './ProgressBar.css';

/**
 * ProgressBar Component
 *
 * Displays a visual progress bar with percentage.
 * Uses earth tone colors and smooth animations.
 *
 * @param {Object} props - Component props
 * @param {number} props.percentage - Progress percentage (0-100)
 * @param {boolean} props.showLabel - Whether to show percentage label (default: false)
 */
function ProgressBar({ percentage = 0, showLabel = false }) {
  // Ensure percentage is between 0 and 100
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${clampedPercentage}%` }}
        >
          {showLabel && clampedPercentage > 10 && (
            <span className="progress-bar-label">{clampedPercentage}%</span>
          )}
        </div>
      </div>
      {showLabel && clampedPercentage <= 10 && clampedPercentage > 0 && (
        <span className="progress-bar-label-external">{clampedPercentage}%</span>
      )}
    </div>
  );
}

export default ProgressBar;
