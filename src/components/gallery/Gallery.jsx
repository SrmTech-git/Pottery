import React, { useState, useEffect } from 'react';
import './Gallery.css';
import Button from '../common/Button';
import StatusBadge from '../common/StatusBadge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getFavoritePotteryPieces } from '../../services/potteryPieceService';
import { getClayTypeById } from '../../services/clayTypeService';
import { getGlazesForPiece } from '../../services/potteryPieceGlazeService';

/**
 * Gallery Component
 *
 * Displays up to 10 favorite pottery pieces in a visual gallery with flip cards.
 * Cards show the photo on front, and details on the back when hovered.
 *
 * @param {function} onBackClick - Function to call when back button is clicked
 */
function Gallery({ onBackClick }) {
  const [favoritePieces, setFavoritePieces] = useState([]);

  // Load favorite pieces on mount
  useEffect(() => {
    loadFavorites();

    // Listen for data changes
    const handleDataChange = () => {
      loadFavorites();
    };
    window.addEventListener('potteryDataChanged', handleDataChange);

    return () => {
      window.removeEventListener('potteryDataChanged', handleDataChange);
    };
  }, []);

  const loadFavorites = () => {
    const pieces = getFavoritePotteryPieces(10);
    setFavoritePieces(pieces);
  };

  /**
   * Format date
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
    <div className="gallery-page">
      <div className="gallery-back-button">
        <Button onClick={onBackClick} variant="secondary">
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Main
        </Button>
      </div>

      <div className="gallery-header">
        <h2>Gallery</h2>
        <p className="gallery-subtitle">
          Your favorite pottery pieces (up to 10) • Hover to see details
        </p>
      </div>

      {favoritePieces.length === 0 ? (
        <div className="gallery-empty">
          <p>No favorite pieces yet!</p>
          <p className="gallery-hint">
            Star your favorite pieces to add them to the gallery
          </p>
        </div>
      ) : (
        <div className="gallery-grid">
          {favoritePieces.map(piece => {
            const glazes = getGlazesForPiece(piece.id);
            const clayType = getClayTypeById(piece.clayTypeId);

            return (
              <div key={piece.id} className="flip-card">
                <div className="flip-card-inner">
                  {/* Front side - just the photo */}
                  <div className="flip-card-front">
                    {piece.imageUrl ? (
                      <img src={piece.imageUrl} alt={piece.name} />
                    ) : (
                      <div className="flip-card-placeholder">
                        <span>No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Back side - piece information */}
                  <div className="flip-card-back">
                    <div className="flip-card-content">
                      <h3>{piece.name}</h3>

                      <div className="flip-card-detail">
                        <span className="detail-label">Status:</span>
                        <StatusBadge status={piece.status} />
                      </div>

                      <div className="flip-card-detail">
                        <span className="detail-label">Form:</span>
                        <span className="detail-value">{piece.formType || 'N/A'}</span>
                      </div>

                      <div className="flip-card-detail">
                        <span className="detail-label">Clay:</span>
                        <span className="detail-value">
                          {clayType ? clayType.name : 'Unknown'}
                        </span>
                      </div>

                      {glazes.length > 0 && (
                        <div className="flip-card-detail">
                          <span className="detail-label">Glazes:</span>
                          <span className="detail-value">
                            {glazes.map(g => g.name).join(', ')}
                          </span>
                        </div>
                      )}

                      {piece.height && piece.width && (
                        <div className="flip-card-detail">
                          <span className="detail-label">Size:</span>
                          <span className="detail-value">
                            {piece.height}" × {piece.width}"
                          </span>
                        </div>
                      )}

                      <div className="flip-card-detail">
                        <span className="detail-label">Thrown:</span>
                        <span className="detail-value">{formatDate(piece.thrownDate)}</span>
                      </div>

                      {piece.notes && (
                        <div className="flip-card-notes">
                          <span className="detail-label">Notes:</span>
                          <p>{piece.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {favoritePieces.length > 0 && favoritePieces.length < 10 && (
        <div className="gallery-footer">
          <p>
            Showing {favoritePieces.length} of 10 favorite piece{favoritePieces.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
}

export default Gallery;
