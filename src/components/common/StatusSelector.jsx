import React from 'react';
import './StatusSelector.css';
import { POTTERY_STATUS, STATUS_DISPLAY_NAMES } from '../../models/PotteryPiece';

/**
 * StatusSelector Component
 *
 * Displays status options as clickable icon buttons.
 * Each status has a unique icon representing the stage.
 *
 * @param {Object} props - Component props
 * @param {string} props.selectedStatus - Currently selected status
 * @param {function} props.onStatusChange - Function called when status is selected
 */
function StatusSelector({ selectedStatus, onStatusChange }) {
  // Icon mapping for each status
  const statusIcons = {
    [POTTERY_STATUS.THROWN]: '🎨',           // Freshly created
    [POTTERY_STATUS.LEATHER_DRY]: '✂️',     // Ready to trim
    [POTTERY_STATUS.BISQUE_FIRED]: '🔥',    // First firing
    [POTTERY_STATUS.GLAZED]: '💧',          // Glaze applied
    [POTTERY_STATUS.FIRED]: '✨'            // Complete!
  };

  const statuses = [
    POTTERY_STATUS.THROWN,
    POTTERY_STATUS.LEATHER_DRY,
    POTTERY_STATUS.BISQUE_FIRED,
    POTTERY_STATUS.GLAZED,
    POTTERY_STATUS.FIRED
  ];

  return (
    <div className="status-selector">
      <label className="status-selector-label">Status:</label>
      <div className="status-buttons">
        {statuses.map(status => (
          <button
            key={status}
            type="button"
            className={`status-button ${selectedStatus === status ? 'selected' : ''}`}
            onClick={() => onStatusChange(status)}
          >
            <span className="status-icon">{statusIcons[status]}</span>
            <span className="status-name">{STATUS_DISPLAY_NAMES[status]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default StatusSelector;
