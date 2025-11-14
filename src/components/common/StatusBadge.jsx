import React from 'react';
import './StatusBadge.css';
import { POTTERY_STATUS, STATUS_DISPLAY_NAMES } from '../../models/PotteryPiece';

/**
 * StatusBadge Component
 *
 * Displays a colored badge showing the current status of a pottery piece.
 * Different statuses get different colors for visual clarity.
 *
 * @param {Object} props - Component props
 * @param {string} props.status - The status value (e.g., 'thrown', 'fired')
 */
function StatusBadge({ status }) {
  // Get the user-friendly display name
  const displayName = STATUS_DISPLAY_NAMES[status] || status;

  // Determine the CSS class based on status
  // This controls the badge color
  const getBadgeClass = () => {
    switch (status) {
      case POTTERY_STATUS.THROWN:
        return 'status-badge status-thrown';
      case POTTERY_STATUS.LEATHER_DRY:
        return 'status-badge status-leather-dry';
      case POTTERY_STATUS.BISQUE_FIRED:
        return 'status-badge status-bisque-fired';
      case POTTERY_STATUS.GLAZED:
        return 'status-badge status-glazed';
      case POTTERY_STATUS.FIRED:
        return 'status-badge status-fired';
      default:
        return 'status-badge';
    }
  };

  return (
    <span className={getBadgeClass()}>
      {displayName}
    </span>
  );
}

export default StatusBadge;
