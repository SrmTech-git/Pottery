import React, { useState, useEffect } from 'react';
import './ClayManager.css';
import Button from '../common/Button';
import Modal from '../common/Modal';
import ClayForm from './ClayForm';
import ClayTooltip from '../common/ClayTooltip';
import { getAllClayTypes } from '../../services/clayTypeService';

/**
 * ClayManager Component
 *
 * Manages clay types - displays list and allows adding/editing.
 */
function ClayManager() {
  const [clayTypes, setClayTypes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClay, setEditingClay] = useState(null);

  // Load clay types
  useEffect(() => {
    loadClayTypes();

    // Listen for data changes
    const handleDataChange = () => {
      loadClayTypes();
    };
    window.addEventListener('potteryDataChanged', handleDataChange);

    return () => {
      window.removeEventListener('potteryDataChanged', handleDataChange);
    };
  }, []);

  const loadClayTypes = () => {
    const clays = getAllClayTypes();
    setClayTypes(clays);
  };

  const handleAddClick = () => {
    setEditingClay(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (clay) => {
    setEditingClay(clay);
    setIsModalOpen(true);
  };

  const handleFormSuccess = () => {
    setIsModalOpen(false);
    setEditingClay(null);
    loadClayTypes();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingClay(null);
  };

  return (
    <div className="clay-manager">
      <div className="clay-manager-header">
        <h2>🪨 Clay Types</h2>
        <Button onClick={handleAddClick} variant="primary">
          + Add Clay Type
        </Button>
      </div>

      <div className="clay-list">
        {clayTypes.length === 0 ? (
          <div className="empty-state">
            <p>No clay types yet. Add your first clay type to get started!</p>
          </div>
        ) : (
          <div className="clay-grid">
            {clayTypes.map(clay => (
              <ClayTooltip key={clay.id} clayType={clay}>
                <div className="clay-card">
                  <div className="clay-card-header">
                    <h3>{clay.manufacturer}</h3>
                    <button
                      className="clay-edit-button"
                      onClick={() => handleEditClick(clay)}
                      title="Edit clay type"
                    >
                      ✏️
                    </button>
                  </div>
                  <div className="clay-card-body">
                    <div className="clay-name">{clay.name}</div>
                    <div className="clay-details">
                      <span className="clay-cone">{clay.coneNumber}</span>
                      <span className="clay-color-dot" style={{
                        backgroundColor: `var(--clay-color-${clay.color.replace(/ /g, '-')}, var(--primary-color))`
                      }} title={clay.color}></span>
                    </div>
                    {clay.description && (
                      <p className="clay-description">{clay.description}</p>
                    )}
                  </div>
                </div>
              </ClayTooltip>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title={editingClay ? 'Edit Clay Type' : 'Add New Clay Type'}
      >
        <ClayForm
          clayType={editingClay}
          onSuccess={handleFormSuccess}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
}

export default ClayManager;
