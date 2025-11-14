import React, { useState, useEffect } from 'react';
import './PotteryForm.css';
import Button from '../common/Button';
import StatusSelector from '../common/StatusSelector';
import { POTTERY_STATUS } from '../../models/PotteryPiece';
import { getAllClayTypes } from '../../services/clayTypeService';
import { createNewPotteryPiece } from '../../services/potteryPieceService';

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

  // Available clay types
  const [clayTypes, setClayTypes] = useState([]);

  // Load clay types when component mounts
  useEffect(() => {
    const types = getAllClayTypes();
    setClayTypes(types);

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
