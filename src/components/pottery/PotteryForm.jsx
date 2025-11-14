import React, { useState, useEffect } from 'react';
import './PotteryForm.css';
import Button from '../common/Button';
import StatusSelector from '../common/StatusSelector';
import { POTTERY_STATUS } from '../../models/PotteryPiece';
import { APPLICATION_METHOD, APPLICATION_AREA } from '../../models/PotteryPieceGlaze';
import { getAllClayTypes } from '../../services/clayTypeService';
import { getAllGlazes } from '../../services/glazeService';
import { createNewPotteryPiece } from '../../services/potteryPieceService';
import { addGlazeToPiece } from '../../services/potteryPieceGlazeService';

/**
 * PotteryForm Component
 *
 * Form for creating a new pottery piece.
 * Includes all necessary fields with validation.
 *
 * @param {Object} props - Component props
 * @param {function} props.onSuccess - Called when piece is successfully created
 * @param {function} props.onCancel - Called when user cancels
 */
function PotteryForm({ onSuccess, onCancel }) {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    clayTypeId: '',
    status: POTTERY_STATUS.THROWN,
    formType: '',
    height: '',
    width: '',
    weight: '',
    notes: '',
    imageUrl: ''
  });

  // Available clay types and glazes
  const [clayTypes, setClayTypes] = useState([]);
  const [availableGlazes, setAvailableGlazes] = useState([]);

  // Selected glazes with application details
  const [selectedGlazes, setSelectedGlazes] = useState([]);

  // Load clay types and glazes when component mounts
  useEffect(() => {
    const types = getAllClayTypes();
    setClayTypes(types);

    const glazes = getAllGlazes();
    setAvailableGlazes(glazes);

    // Pre-select first clay type if available
    if (types.length > 0 && !formData.clayTypeId) {
      setFormData(prev => ({ ...prev, clayTypeId: types[0].id }));
    }
  }, [formData.clayTypeId]);

  /**
   * Handle input changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Handle status change from StatusSelector
   */
  const handleStatusChange = (status) => {
    setFormData(prev => ({
      ...prev,
      status
    }));
  };

  /**
   * Add a glaze to the piece
   */
  const handleAddGlaze = () => {
    if (availableGlazes.length === 0) return;

    // Add first available glaze with default settings
    const firstGlaze = availableGlazes[0];
    setSelectedGlazes(prev => [...prev, {
      glazeId: firstGlaze.id,
      glazeName: firstGlaze.name,
      applicationMethod: APPLICATION_METHOD.DIPPED,
      applicationArea: APPLICATION_AREA.FULL,
      layers: 1
    }]);
  };

  /**
   * Remove a glaze from selection
   */
  const handleRemoveGlaze = (index) => {
    setSelectedGlazes(prev => prev.filter((_, i) => i !== index));
  };

  /**
   * Update glaze application details
   */
  const handleGlazeChange = (index, field, value) => {
    setSelectedGlazes(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };

      // Update glaze name if glaze ID changed
      if (field === 'glazeId') {
        const glaze = availableGlazes.find(g => g.id === parseInt(value));
        updated[index].glazeName = glaze ? glaze.name : '';
      }

      return updated;
    });
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the new pottery piece
    const newPiece = createNewPotteryPiece({
      name: formData.name,
      clayTypeId: parseInt(formData.clayTypeId),
      status: formData.status,
      formType: formData.formType,
      height: parseFloat(formData.height) || 0,
      width: parseFloat(formData.width) || 0,
      weight: parseFloat(formData.weight) || 0,
      notes: formData.notes,
      imageUrl: formData.imageUrl
    });

    // Add glazes to the piece
    selectedGlazes.forEach(glaze => {
      addGlazeToPiece({
        potteryPieceId: newPiece.id,
        glazeId: parseInt(glaze.glazeId),
        applicationMethod: glaze.applicationMethod,
        applicationArea: glaze.applicationArea,
        layers: parseInt(glaze.layers) || 1
      });
    });

    // Call success callback
    onSuccess(newPiece);
  };

  return (
    <form className="pottery-form" onSubmit={handleSubmit}>
      {/* Name field */}
      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Morning Coffee Mug"
          required
        />
      </div>

      {/* Form type */}
      <div className="form-group">
        <label htmlFor="formType">Form Type *</label>
        <input
          type="text"
          id="formType"
          name="formType"
          value={formData.formType}
          onChange={handleChange}
          placeholder="e.g., bowl, vase, mug, plate"
          required
        />
      </div>

      {/* Clay type dropdown */}
      <div className="form-group">
        <label htmlFor="clayTypeId">Clay Type *</label>
        <select
          id="clayTypeId"
          name="clayTypeId"
          value={formData.clayTypeId}
          onChange={handleChange}
          required
        >
          {clayTypes.map(clay => (
            <option key={clay.id} value={clay.id}>
              {clay.name} ({clay.temperature} fire, {clay.color})
            </option>
          ))}
        </select>
      </div>

      {/* Status selector with icon buttons */}
      <StatusSelector
        selectedStatus={formData.status}
        onStatusChange={handleStatusChange}
      />

      {/* Dimensions */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="height">Height (inches)</label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            step="0.1"
            min="0"
            placeholder="0.0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="width">Width (inches)</label>
          <input
            type="number"
            id="width"
            name="width"
            value={formData.width}
            onChange={handleChange}
            step="0.1"
            min="0"
            placeholder="0.0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="weight">Weight (lbs)</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            step="0.1"
            min="0"
            placeholder="0.0"
          />
        </div>
      </div>

      {/* Glazes section */}
      <div className="form-group">
        <label>Glazes (optional)</label>

        {selectedGlazes.length === 0 ? (
          <p className="form-hint">No glazes added yet. Click the button below to add a glaze.</p>
        ) : (
          <div className="glaze-list">
            {selectedGlazes.map((glaze, index) => (
              <div key={index} className="glaze-item">
                <div className="glaze-item-header">
                  <span className="glaze-number">Glaze {index + 1}</span>
                  <button
                    type="button"
                    className="glaze-remove"
                    onClick={() => handleRemoveGlaze(index)}
                  >
                    Remove
                  </button>
                </div>

                <div className="glaze-fields">
                  {/* Glaze selection */}
                  <div className="glaze-field">
                    <label>Glaze Type</label>
                    <select
                      value={glaze.glazeId}
                      onChange={(e) => handleGlazeChange(index, 'glazeId', e.target.value)}
                    >
                      {availableGlazes.map(g => (
                        <option key={g.id} value={g.id}>
                          {g.name} ({g.color}, {g.temperature} fire)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Application method */}
                  <div className="glaze-field">
                    <label>Method</label>
                    <select
                      value={glaze.applicationMethod}
                      onChange={(e) => handleGlazeChange(index, 'applicationMethod', e.target.value)}
                    >
                      <option value={APPLICATION_METHOD.DIPPED}>Dipped</option>
                      <option value={APPLICATION_METHOD.BRUSHED}>Brushed</option>
                      <option value={APPLICATION_METHOD.SPRAYED}>Sprayed</option>
                      <option value={APPLICATION_METHOD.POURED}>Poured</option>
                      <option value={APPLICATION_METHOD.SPONGED}>Sponged</option>
                    </select>
                  </div>

                  {/* Application area */}
                  <div className="glaze-field">
                    <label>Area</label>
                    <select
                      value={glaze.applicationArea}
                      onChange={(e) => handleGlazeChange(index, 'applicationArea', e.target.value)}
                    >
                      <option value={APPLICATION_AREA.FULL}>Full</option>
                      <option value={APPLICATION_AREA.EXTERIOR}>Exterior</option>
                      <option value={APPLICATION_AREA.INTERIOR}>Interior</option>
                      <option value={APPLICATION_AREA.RIM}>Rim</option>
                      <option value={APPLICATION_AREA.BASE}>Base</option>
                      <option value={APPLICATION_AREA.PARTIAL}>Partial</option>
                    </select>
                  </div>

                  {/* Layers */}
                  <div className="glaze-field">
                    <label>Layers</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={glaze.layers}
                      onChange={(e) => handleGlazeChange(index, 'layers', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          className="add-glaze-button"
          onClick={handleAddGlaze}
        >
          + Add Glaze
        </button>
      </div>

      {/* Notes */}
      <div className="form-group">
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Add any notes about this piece..."
          rows="3"
        />
      </div>

      {/* Image URL (base64 or regular URL) */}
      <div className="form-group">
        <label htmlFor="imageUrl">Image URL (optional)</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Paste image URL or base64 data..."
        />
        <small className="form-hint">You can paste a base64 encoded image or a regular image URL</small>
      </div>

      {/* Form actions */}
      <div className="form-actions">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Create Piece
        </Button>
      </div>
    </form>
  );
}

export default PotteryForm;
