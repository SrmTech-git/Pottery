import React, { useState, useEffect } from 'react';
import './ClayForm.css';
import Button from '../common/Button';
import { CLAY_COLORS, CONE_NUMBERS } from '../../models/ClayType';
import { createNewClayType, updateClayType } from '../../services/clayTypeService';

/**
 * ClayForm Component
 *
 * Form for creating or editing a clay type.
 * Includes all necessary fields with validation.
 *
 * @param {Object} props - Component props
 * @param {Object} props.clayType - Optional clay type to edit (null for new)
 * @param {function} props.onSuccess - Called when clay is successfully created/updated
 * @param {function} props.onCancel - Called when user cancels
 */
function ClayForm({ clayType, onSuccess, onCancel }) {
  const isEditMode = !!clayType;

  // Form state
  const [formData, setFormData] = useState({
    manufacturer: '',
    name: '',
    description: '',
    coneNumber: CONE_NUMBERS.CONE_6,
    color: CLAY_COLORS.BUFF,
    shrinkage: '',
    absorptionRate: '',
    notes: ''
  });

  // Load clay type data if editing
  useEffect(() => {
    if (isEditMode && clayType) {
      setFormData({
        manufacturer: clayType.manufacturer || '',
        name: clayType.name || '',
        description: clayType.description || '',
        coneNumber: clayType.coneNumber || CONE_NUMBERS.CONE_6,
        color: clayType.color || CLAY_COLORS.BUFF,
        shrinkage: clayType.shrinkage || '',
        absorptionRate: clayType.absorptionRate || '',
        notes: clayType.notes || ''
      });
    }
  }, [clayType, isEditMode]);

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
   * Handle form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const clayData = {
      manufacturer: formData.manufacturer,
      name: formData.name,
      description: formData.description,
      coneNumber: formData.coneNumber,
      color: formData.color,
      shrinkage: parseFloat(formData.shrinkage) || 0,
      absorptionRate: parseFloat(formData.absorptionRate) || 0,
      notes: formData.notes
    };

    let savedClay;
    if (isEditMode) {
      savedClay = updateClayType(clayType.id, clayData);
    } else {
      savedClay = createNewClayType(clayData);
    }

    // Dispatch event to notify other components
    window.dispatchEvent(new Event('potteryDataChanged'));

    // Call success callback
    onSuccess(savedClay);
  };

  return (
    <form className="clay-form" onSubmit={handleSubmit}>
      {/* Manufacturer field */}
      <div className="form-group">
        <label htmlFor="manufacturer">Manufacturer *</label>
        <input
          type="text"
          id="manufacturer"
          name="manufacturer"
          value={formData.manufacturer}
          onChange={handleChange}
          placeholder="e.g., Laguna, Standard Ceramic"
          required
        />
      </div>

      {/* Name field */}
      <div className="form-group">
        <label htmlFor="name">Product Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., B-Mix 5 w/ Grog"
          required
        />
      </div>

      {/* Description */}
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Brief description of the clay..."
          rows="2"
        />
      </div>

      {/* Cone Number and Color in a row */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="coneNumber">Cone Number *</label>
          <select
            id="coneNumber"
            name="coneNumber"
            value={formData.coneNumber}
            onChange={handleChange}
            required
          >
            {Object.values(CONE_NUMBERS).map(cone => (
              <option key={cone} value={cone}>{cone}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="color">Fired Color *</label>
          <select
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            required
          >
            {Object.values(CLAY_COLORS).map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Shrinkage and Absorption Rate */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="shrinkage">Shrinkage (%)</label>
          <input
            type="number"
            id="shrinkage"
            name="shrinkage"
            value={formData.shrinkage}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="30"
            placeholder="0.0"
          />
          <small className="form-hint">Optional: Total shrinkage percentage</small>
        </div>

        <div className="form-group">
          <label htmlFor="absorptionRate">Absorption Rate (%)</label>
          <input
            type="number"
            id="absorptionRate"
            name="absorptionRate"
            value={formData.absorptionRate}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="20"
            placeholder="0.0"
          />
          <small className="form-hint">Optional: Water absorption percentage</small>
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
          placeholder="Additional notes about this clay type..."
          rows="3"
        />
      </div>

      {/* Form actions */}
      <div className="form-actions">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {isEditMode ? 'Update Clay Type' : 'Add Clay Type'}
        </Button>
      </div>
    </form>
  );
}

export default ClayForm;
