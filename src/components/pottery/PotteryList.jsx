import React, { useState, useEffect } from 'react';
import './PotteryList.css';
import StatusBadge from '../common/StatusBadge';
import Button from '../common/Button';
import Modal from '../common/Modal';
import PotteryForm from './PotteryForm';
import { getAllPotteryPieces } from '../../services/potteryPieceService';
import { getClayTypeById } from '../../services/clayTypeService';
import { getGlazesForPiece } from '../../services/potteryPieceGlazeService';

/**
 * PotteryList Component
 *
 * Displays a list of all pottery pieces with their status and details.
 * Shows pieces in a card layout with relevant information.
 */
function PotteryList() {
  // State to hold the pottery pieces
  const [pieces, setPieces] = useState([]);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

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
   * Open the add new piece modal
   */
  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  /**
   * Close the modal
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  /**
   * Handle successful piece creation
   */
  const handlePieceCreated = () => {
    loadPieces(); // Reload the list
    setIsModalOpen(false); // Close the modal
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
   * Get glazes used on a piece
   * @param {number} pieceId - The pottery piece ID
   * @returns {Array} Array of glaze objects with application details
   */
  const getGlazesForAPiece = (pieceId) => {
    return getGlazesForPiece(pieceId);
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
        <div className="header-left">
          <h2>Pottery Pieces</h2>
          <p className="piece-count">{pieces.length} piece{pieces.length !== 1 ? 's' : ''}</p>
        </div>
        <Button onClick={handleAddClick}>
          + Add New Piece
        </Button>
      </div>

      {pieces.length === 0 ? (
        <div className="empty-state">
          <p>No pottery pieces yet.</p>
          <p className="empty-hint">Create your first piece to get started!</p>
        </div>
      ) : (
        <div className="pottery-grid">
          {pieces.map(piece => {
            // Get glazes for this piece
            const glazes = getGlazesForAPiece(piece.id);

            return (
              <div key={piece.id} className="pottery-card">
                <div className="pottery-card-header">
                  <h3>{piece.name}</h3>
                  <StatusBadge status={piece.status} />
                </div>

                {/* Image section - shows image or placeholder */}
                <div className="pottery-card-image">
                  {piece.imageUrl ? (
                    <img src={piece.imageUrl} alt={piece.name} />
                  ) : (
                    <div className="image-placeholder">
                      <span>No Image</span>
                    </div>
                  )}
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

                  {/* Glazes section */}
                  {glazes.length > 0 && (
                    <div className="pottery-detail">
                      <span className="detail-label">Glazes:</span>
                      <span className="detail-value">
                        {glazes.map((glaze, index) => (
                          <span key={glaze.relationshipId}>
                            {glaze.name}
                            {glaze.applicationDetails?.applicationArea !== 'full' &&
                              ` (${glaze.applicationDetails.applicationArea})`}
                            {index < glazes.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </span>
                    </div>
                  )}

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
            );
          })}
        </div>
      )}

      {/* Modal for adding new piece */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Add New Pottery Piece"
      >
        <PotteryForm
          onSuccess={handlePieceCreated}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
}

export default PotteryList;
