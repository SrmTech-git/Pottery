import React from 'react';
import './GlazeTooltip.css';

/**
 * GlazeTooltip Component
 *
 * Displays detailed glaze information in a hover tooltip.
 * Shows manufacturer, product code, cone number, finish, coats, and food safety.
 */
function GlazeTooltip({ glaze, children }) {
  if (!glaze) {
    return children;
  }

  return (
    <div className="glaze-tooltip-container">
      {children}
      <div className="glaze-tooltip">
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
      </div>
    </div>
  );
}

export default GlazeTooltip;
