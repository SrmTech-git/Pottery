import React, { useState, useRef } from 'react';
import './ClayTooltip.css';

/**
 * ClayTooltip Component
 *
 * Displays detailed clay information in a hover tooltip.
 * Shows manufacturer, cone number, color, shrinkage, absorption, and notes.
 * Uses fixed positioning to prevent clipping by parent containers.
 */
function ClayTooltip({ clayType, children }) {
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef(null);

  if (!clayType) {
    return children;
  }

  const handleMouseEnter = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      // Position tooltip above the element, centered horizontally
      setTooltipPosition({
        top: rect.top - 8, // 8px gap above element
        left: rect.left + rect.width / 2
      });
    }
  };

  return (
    <div
      className="clay-tooltip-container"
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
    >
      {children}
      <div
        className="clay-tooltip"
        style={{
          top: `${tooltipPosition.top}px`,
          left: `${tooltipPosition.left}px`
        }}
      >
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
