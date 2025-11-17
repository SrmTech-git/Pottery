import React, { useState, useEffect } from 'react';
import './PotteryList.css';
import StatusBadge from '../common/StatusBadge';
import Button from '../common/Button';
import Modal from '../common/Modal';
import ProgressBar from '../common/ProgressBar';
import ClayTooltip from '../common/ClayTooltip';
import GlazeTooltip from '../common/GlazeTooltip';
import PotteryForm from './PotteryForm';
import {
  getActivePotteryPieces,
  getArchivedPotteryPieces,
  archivePotteryPiece,
  unarchivePotteryPiece
} from '../../services/potteryPieceService';
import { getClayTypeById } from '../../services/clayTypeService';
import { getGlazesForPiece } from '../../services/potteryPieceGlazeService';
import { getProgressPercentage } from '../../models/PotteryPiece';

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

  // Edit state - track which piece is being edited (null for new piece)
  const [editingPiece, setEditingPiece] = useState(null);

  // Archive view toggle
  const [showArchived, setShowArchived] = useState(false);

  // Load pottery pieces when component mounts or when showArchived changes
  useEffect(() => {
    loadPieces();

    // Listen for data changes from other components
    const handleDataChange = () => {
      loadPieces();
    };

    window.addEventListener('potteryDataChanged', handleDataChange);

    return () => {
      window.removeEventListener('potteryDataChanged', handleDataChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showArchived]);

  /**
   * Load pottery pieces from localStorage based on archive filter
   */
  const loadPieces = () => {
    const loadedPieces = showArchived ? getArchivedPotteryPieces() : getActivePotteryPieces();
    setPieces(loadedPieces);
  };

  /**
   * Open the add new piece modal
   */
  const handleAddClick = () => {
    setEditingPiece(null); // Clear editing state
    setIsModalOpen(true);
  };

  /**
   * Open the edit piece modal
   */
  const handleEditClick = (piece) => {
    setEditingPiece(piece);
    setIsModalOpen(true);
  };

  /**
   * Close the modal
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPiece(null); // Clear editing state
  };

  /**
   * Handle successful piece creation or update
   */
  const handlePieceCreated = () => {
    loadPieces(); // Reload the list
    setIsModalOpen(false); // Close the modal
    setEditingPiece(null); // Clear editing state
  };

  /**
   * Archive a pottery piece
   */
  const handleArchive = (pieceId) => {
    archivePotteryPiece(pieceId);
    loadPieces(); // Reload to show updated list
    window.dispatchEvent(new Event('potteryDataChanged'));
  };

  /**
   * Unarchive a pottery piece
   */
  const handleUnarchive = (pieceId) => {
    unarchivePotteryPiece(pieceId);
    loadPieces(); // Reload to show updated list
    window.dispatchEvent(new Event('potteryDataChanged'));
  };

  /**
   * Toggle between active and archived view
   */
  const handleToggleArchived = () => {
    setShowArchived(!showArchived);
  };

  /**
   * Get clay type display name for a piece
   * @param {number} clayTypeId - The clay type ID
   * @returns {string} The clay type display name or 'Unknown'
   */
  const getClayTypeName = (clayTypeId) => {
    const clayType = getClayTypeById(clayTypeId);
    return clayType ? `${clayType.manufacturer} - ${clayType.name}` : 'Unknown';
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
          <h2>{showArchived ? '📦 Archived Pieces' : '🏺 Pottery Pieces'}</h2>
          <p className="piece-count">{pieces.length} piece{pieces.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="header-right">
          <Button onClick={handleToggleArchived} variant="secondary">
            {showArchived ? 'Show Active' : 'Show Archived'}
          </Button>
          {!showArchived && (
            <Button onClick={handleAddClick}>
              + Add New Piece
            </Button>
          )}
        </div>
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
                  <div className="card-header-actions">
                    <StatusBadge status={piece.status} />
                    {!showArchived && (
                      <button
                        className="edit-button"
                        onClick={() => handleEditClick(piece)}
                        title="Edit piece"
                      >
                        Edit
                      </button>
                    )}
                    {showArchived ? (
                      <button
                        className="archive-button unarchive"
                        onClick={() => handleUnarchive(piece.id)}
                        title="Unarchive piece"
                      >
                        Unarchive
                      </button>
                    ) : (
                      <button
                        className="archive-button"
                        onClick={() => handleArchive(piece.id)}
                        title="Archive piece"
                      >
                        Archive
                      </button>
                    )}
                  </div>
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
                    <ClayTooltip clayType={getClayTypeById(piece.clayTypeId)}>
                      <span className="detail-value">{getClayTypeName(piece.clayTypeId)}</span>
                    </ClayTooltip>
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
                            <GlazeTooltip glaze={glaze}>
                              <span className="glaze-name">
                                {glaze.name}
                                {glaze.applicationDetails?.applicationArea !== 'full' &&
                                  ` (${glaze.applicationDetails.applicationArea})`}
                              </span>
                            </GlazeTooltip>
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

                {/* Progress bar showing completion status */}
                <ProgressBar percentage={getProgressPercentage(piece.status)} />
              </div>
            );
          })}
        </div>
      )}

      {/* Modal for adding/editing piece */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingPiece ? "Edit Pottery Piece" : "Add New Pottery Piece"}
      >
        <PotteryForm
          piece={editingPiece}
          onSuccess={handlePieceCreated}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
}

export default PotteryList;
