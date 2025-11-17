import React, { useState, useEffect } from 'react';
import './GlazeManager.css';
import Button from '../common/Button';
import Modal from '../common/Modal';
import GlazeForm from './GlazeForm';
import GlazeTooltip from '../common/GlazeTooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { getAllGlazes, toggleFavoriteGlaze } from '../../services/glazeService';

/**
 * GlazeManager Component
 *
 * Manages glazes - displays list and allows adding/editing.
 */
function GlazeManager() {
  const [glazes, setGlazes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGlaze, setEditingGlaze] = useState(null);

  // Load glazes
  useEffect(() => {
    loadGlazes();

    // Listen for data changes
    const handleDataChange = () => {
      loadGlazes();
    };
    window.addEventListener('potteryDataChanged', handleDataChange);

    return () => {
      window.removeEventListener('potteryDataChanged', handleDataChange);
    };
  }, []);

  const loadGlazes = () => {
    const allGlazes = getAllGlazes();
    setGlazes(allGlazes);
  };

  const handleAddClick = () => {
    setEditingGlaze(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (glaze) => {
    setEditingGlaze(glaze);
    setIsModalOpen(true);
  };

  const handleFormSuccess = () => {
    setIsModalOpen(false);
    setEditingGlaze(null);
    loadGlazes();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingGlaze(null);
  };

  const handleToggleFavorite = (e, glazeId) => {
    e.stopPropagation(); // Prevent tooltip from being affected
    toggleFavoriteGlaze(glazeId);
    loadGlazes();
    window.dispatchEvent(new Event('potteryDataChanged'));
  };

  return (
    <div className="glaze-manager">
      <div className="glaze-manager-header">
        <h2>🎨 Glazes</h2>
        <Button onClick={handleAddClick} variant="primary">
          + Add Glaze
        </Button>
      </div>

      <div className="glaze-list">
        {glazes.length === 0 ? (
          <div className="empty-state">
            <p>No glazes yet. Add your first glaze to get started!</p>
          </div>
        ) : (
          <div className="glaze-grid">
            {glazes.map(glaze => (
              <GlazeTooltip key={glaze.id} glaze={glaze}>
                <div className="glaze-card">
                  <div className="glaze-card-header">
                    <h3>{glaze.manufacturer}</h3>
                    <div className="glaze-card-actions">
                      <button
                        className="glaze-favorite-button"
                        onClick={(e) => handleToggleFavorite(e, glaze.id)}
                        title={glaze.isFavorite ? "Remove from favorites" : "Add to favorites"}
                      >
                        <FontAwesomeIcon
                          icon={glaze.isFavorite ? faStarSolid : faStarRegular}
                          className={glaze.isFavorite ? 'favorite-active' : 'favorite-inactive'}
                        />
                      </button>
                      <button
                        className="glaze-edit-button"
                        onClick={() => handleEditClick(glaze)}
                        title="Edit glaze"
                      >
                        ✏️
                      </button>
                    </div>
                  </div>
                  <div className="glaze-card-body">
                    <div className="glaze-name">{glaze.name}</div>
                    {glaze.productCode && (
                      <div className="glaze-code">{glaze.productCode}</div>
                    )}
                    <div className="glaze-details">
                      <span className="glaze-cone">{glaze.coneNumber}</span>
                      <span
                        className="glaze-finish-badge-mini"
                        data-finish={glaze.finish}
                      >
                        {glaze.finish}
                      </span>
                    </div>
                    <div className="glaze-color-label">{glaze.color}</div>
                    {glaze.description && (
                      <p className="glaze-description">{glaze.description}</p>
                    )}
                  </div>
                </div>
              </GlazeTooltip>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title={editingGlaze ? 'Edit Glaze' : 'Add New Glaze'}
      >
        <GlazeForm
          glaze={editingGlaze}
          onSuccess={handleFormSuccess}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
}

export default GlazeManager;
