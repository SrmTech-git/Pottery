import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import './GlazeTooltip.css';

/**
 * GlazeTooltip Component
 *
 * Displays detailed glaze information in a hover tooltip.
 * Shows manufacturer, product code, cone number, finish, coats, and food safety.
 * Uses React Portal to render tooltip at body level, preventing clipping.
 */
function GlazeTooltip({ glaze, children }) {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef(null);

  if (!glaze) {
    return children;
  }

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      // Position tooltip above the element, centered horizontally
      setTooltipPosition({
        top: rect.top - 8, // 8px gap above element
        left: rect.left + rect.width / 2
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Tooltip content rendered via portal
  const tooltipContent = isHovered && createPortal(
    <div
      className="glaze-tooltip glaze-tooltip-visible"
      style={{
        top: `${tooltipPosition.top}px`,
        left: `${tooltipPosition.left}px`
      }}
    >
      <div className="glaze-tooltip-header">
        <h4>{glaze.manufacturer}</h4>
        <span className="glaze-tooltip-name">{glaze.name}</span>
        {glaze.productCode && (
          <span className="glaze-tooltip-code">{glaze.productCode}</span>
        )}
      </div>
      <div className="glaze-tooltip-body">
        <div className="glaze-tooltip-row">
          <span className="glaze-tooltip-label">Cone:</span>
          <span className="glaze-tooltip-value">{glaze.coneNumber}</span>
        </div>
        <div className="glaze-tooltip-row">
          <span className="glaze-tooltip-label">Color:</span>
          <span className="glaze-tooltip-value">{glaze.color}</span>
        </div>
        <div className="glaze-tooltip-row">
          <span className="glaze-tooltip-label">Finish:</span>
          <span className="glaze-tooltip-value glaze-finish-badge" data-finish={glaze.finish}>
            {glaze.finish}
          </span>
        </div>
        <div className="glaze-tooltip-row">
          <span className="glaze-tooltip-label">Coats:</span>
          <span className="glaze-tooltip-value">{glaze.coatsRecommended || 3}</span>
        </div>
        {glaze.foodSafety && (
          <div className="glaze-tooltip-row">
            <span className="glaze-tooltip-label">Food Safety:</span>
            <span className={`glaze-tooltip-value food-safety-badge ${glaze.foodSafety === 'food safe' ? 'food-safe' : 'not-food-safe'}`}>
              {glaze.foodSafety}
            </span>
          </div>
        )}
        {glaze.description && (
          <div className="glaze-tooltip-description">
            {glaze.description}
          </div>
        )}
        {glaze.notes && (
          <div className="glaze-tooltip-notes">
            <strong>Application Notes:</strong> {glaze.notes}
          </div>
        )}
      </div>
    </div>,
    document.body
  );

  return (
    <>
      <div
        className="glaze-tooltip-container"
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      {tooltipContent}
    </>
  );
}

export default GlazeTooltip;
