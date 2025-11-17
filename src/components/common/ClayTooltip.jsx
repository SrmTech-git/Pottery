import React from 'react';
import './ClayTooltip.css';

/**
 * ClayTooltip Component
 *
 * Displays detailed clay information in a hover tooltip.
 * Shows manufacturer, cone number, color, shrinkage, absorption, and notes.
 */
function ClayTooltip({ clayType, children }) {
  if (!clayType) {
    return children;
  }

  return (
    <div className="clay-tooltip-container">
      {children}
      <div className="clay-tooltip">
        <div className="clay-tooltip-header">
          <h4>{clayType.manufacturer}</h4>
          <span className="clay-tooltip-name">{clayType.name}</span>
        </div>
        <div className="clay-tooltip-body">
          <div className="clay-tooltip-row">
            <span className="clay-tooltip-label">Cone:</span>
            <span className="clay-tooltip-value">{clayType.coneNumber}</span>
          </div>
          <div className="clay-tooltip-row">
            <span className="clay-tooltip-label">Color:</span>
            <span className="clay-tooltip-value clay-color-badge" style={{ backgroundColor: `var(--clay-color-${clayType.color.replace(/ /g, '-')}, var(--primary-color))` }}>
              {clayType.color}
            </span>
          </div>
          {clayType.shrinkage > 0 && (
            <div className="clay-tooltip-row">
              <span className="clay-tooltip-label">Shrinkage:</span>
              <span className="clay-tooltip-value">{clayType.shrinkage}%</span>
            </div>
          )}
          {clayType.absorptionRate > 0 && (
            <div className="clay-tooltip-row">
              <span className="clay-tooltip-label">Absorption:</span>
              <span className="clay-tooltip-value">{clayType.absorptionRate}%</span>
            </div>
          )}
          {clayType.description && (
            <div className="clay-tooltip-description">
              {clayType.description}
            </div>
          )}
          {clayType.notes && (
            <div className="clay-tooltip-notes">
              <strong>Notes:</strong> {clayType.notes}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClayTooltip;
