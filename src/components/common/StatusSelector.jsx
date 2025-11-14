import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette, faScissors, faFire, faDroplet, faStar } from '@fortawesome/free-solid-svg-icons';
import './StatusSelector.css';
import { POTTERY_STATUS, STATUS_DISPLAY_NAMES } from '../../models/PotteryPiece';

/**
 * StatusSelector Component
 *
 * Displays status options as clickable icon buttons.
 * Each status has a unique FontAwesome icon representing the stage.
 *
 * @param {Object} props - Component props
 * @param {string} props.selectedStatus - Currently selected status
 * @param {function} props.onStatusChange - Function called when status is selected
 */
function StatusSelector({ selectedStatus, onStatusChange }) {
  // Icon mapping for each status (using FontAwesome icons)
  const statusIcons = {
    [POTTERY_STATUS.THROWN]: faPalette,           // Freshly created
    [POTTERY_STATUS.LEATHER_DRY]: faScissors,     // Ready to trim
    [POTTERY_STATUS.BISQUE_FIRED]: faFire,        // First firing
    [POTTERY_STATUS.GLAZED]: faDroplet,           // Glaze applied
    [POTTERY_STATUS.FIRED]: faStar                // Complete!
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
            <span className="status-icon">
              <FontAwesomeIcon icon={statusIcons[status]} />
            </span>
            <span className="status-name">{STATUS_DISPLAY_NAMES[status]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default StatusSelector;
