import React, { useState, useEffect } from 'react';
import './PotteryList.css';
import StatusBadge from '../common/StatusBadge';
import { getAllPotteryPieces } from '../../services/potteryPieceService';
import { getClayTypeById } from '../../services/clayTypeService';

/**
 * PotteryList Component
 *
 * Displays a list of all pottery pieces with their status and details.
 * Shows pieces in a card layout with relevant information.
 */
function PotteryList() {
  // State to hold the pottery pieces
  const [pieces, setPieces] = useState([]);

  // Load pottery pieces when component mounts
  useEffect(() => {
    loadPieces();
  }, []);

  /**
   * Load all pottery pieces from localStorage
   */
  const loadPieces = () => {
    const allPieces = getAllPotteryPieces();
    setPieces(allPieces);
  };

  /**
   * Get clay type name for a piece
   * @param {number} clayTypeId - The clay type ID
   * @returns {string} The clay type name or 'Unknown'
   */
  const getClayTypeName = (clayTypeId) => {
    const clayType = getClayTypeById(clayTypeId);
    return clayType ? clayType.name : 'Unknown';
  };

  /**
   * Format a date string to be more readable
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date (e.g., "Nov 14, 2025")
   */
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';

    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="pottery-list">
      <div className="pottery-list-header">
        <h2>Pottery Pieces</h2>
        <p className="piece-count">{pieces.length} piece{pieces.length !== 1 ? 's' : ''}</p>
      </div>

      {pieces.length === 0 ? (
        <div className="empty-state">
          <p>No pottery pieces yet.</p>
          <p className="empty-hint">Create your first piece to get started!</p>
        </div>
      ) : (
        <div className="pottery-grid">
          {pieces.map(piece => (
            <div key={piece.id} className="pottery-card">
              <div className="pottery-card-header">
                <h3>{piece.name}</h3>
                <StatusBadge status={piece.status} />
              </div>

              <div className="pottery-card-body">
                <div className="pottery-detail">
                  <span className="detail-label">Form:</span>
                  <span className="detail-value">{piece.formType || 'N/A'}</span>
                </div>

                <div className="pottery-detail">
                  <span className="detail-label">Clay:</span>
                  <span className="detail-value">{getClayTypeName(piece.clayTypeId)}</span>
                </div>

                <div className="pottery-detail">
                  <span className="detail-label">Size:</span>
                  <span className="detail-value">
                    {piece.height}" H × {piece.width}" W
                  </span>
                </div>

                <div className="pottery-detail">
                  <span className="detail-label">Created:</span>
                  <span className="detail-value">{formatDate(piece.thrownDate)}</span>
                </div>

                {piece.notes && (
                  <div className="pottery-notes">
                    <span className="detail-label">Notes:</span>
                    <p>{piece.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PotteryList;
