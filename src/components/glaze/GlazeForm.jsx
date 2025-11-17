import React, { useState, useEffect } from 'react';
import './GlazeForm.css';
import Button from '../common/Button';
import { CONE_NUMBERS } from '../../models/ClayType';
import { GLAZE_FINISH, FOOD_SAFETY } from '../../models/Glaze';
import { createNewGlaze, updateGlaze } from '../../services/glazeService';

/**
 * GlazeForm Component
 *
 * Form for creating or editing a glaze.
 * Includes all necessary fields with validation.
 *
 * @param {Object} props - Component props
 * @param {Object} props.glaze - Optional glaze to edit (null for new)
 * @param {function} props.onSuccess - Called when glaze is successfully created/updated
 * @param {function} props.onCancel - Called when user cancels
 */
function GlazeForm({ glaze, onSuccess, onCancel }) {
  const isEditMode = !!glaze;

  // Form state
  const [formData, setFormData] = useState({
    manufacturer: '',
    name: '',
    productCode: '',
    description: '',
    color: '',
    coneNumber: CONE_NUMBERS.CONE_6,
    finish: GLAZE_FINISH.GLOSSY,
    coatsRecommended: 3,
    foodSafety: FOOD_SAFETY.UNKNOWN,
    notes: ''
  });

  // Load glaze data if editing
  useEffect(() => {
    if (isEditMode && glaze) {
      setFormData({
        manufacturer: glaze.manufacturer || '',
        name: glaze.name || '',
        productCode: glaze.productCode || '',
        description: glaze.description || '',
        color: glaze.color || '',
        coneNumber: glaze.coneNumber || CONE_NUMBERS.CONE_6,
        finish: glaze.finish || GLAZE_FINISH.GLOSSY,
        coatsRecommended: glaze.coatsRecommended || 3,
        foodSafety: glaze.foodSafety || FOOD_SAFETY.UNKNOWN,
        notes: glaze.notes || ''
      });
    }
  }, [glaze, isEditMode]);

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

    const glazeData = {
      manufacturer: formData.manufacturer,
      name: formData.name,
      productCode: formData.productCode,
      description: formData.description,
      color: formData.color,
      coneNumber: formData.coneNumber,
      finish: formData.finish,
      coatsRecommended: parseInt(formData.coatsRecommended) || 3,
      foodSafety: formData.foodSafety,
      notes: formData.notes
    };

    let savedGlaze;
    if (isEditMode) {
      savedGlaze = updateGlaze(glaze.id, glazeData);
    } else {
      savedGlaze = createNewGlaze(glazeData);
    }

    // Dispatch event to notify other components
    window.dispatchEvent(new Event('potteryDataChanged'));

    // Call success callback
    onSuccess(savedGlaze);
  };

  return (
    <form className="glaze-form" onSubmit={handleSubmit}>
      {/* Manufacturer field */}
      <div className="form-group">
        <label htmlFor="manufacturer">Manufacturer *</label>
        <input
          type="text"
          id="manufacturer"
          name="manufacturer"
          value={formData.manufacturer}
          onChange={handleChange}
          placeholder="e.g., AMACO, Mayco"
          required
        />
      </div>

      {/* Name and Product Code in a row */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Product Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Celadon"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="productCode">Product Code</label>
          <input
            type="text"
            id="productCode"
            name="productCode"
            value={formData.productCode}
            onChange={handleChange}
            placeholder="e.g., PC-25, SW-402"
          />
        </div>
      </div>

      {/* Description */}
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Brief description of the glaze..."
          rows="2"
        />
      </div>

      {/* Color and Cone Number in a row */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="color">Fired Color *</label>
          <input
            type="text"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="e.g., Pale Green, Iron Red"
            required
          />
        </div>

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
      </div>

      {/* Finish, Coats, and Food Safety */}
      <div className="form-row form-row-three">
        <div className="form-group">
          <label htmlFor="finish">Finish *</label>
          <select
            id="finish"
            name="finish"
            value={formData.finish}
            onChange={handleChange}
            required
          >
            {Object.values(GLAZE_FINISH).map(finish => (
              <option key={finish} value={finish}>{finish}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="coatsRecommended">Coats *</label>
          <input
            type="number"
            id="coatsRecommended"
            name="coatsRecommended"
            value={formData.coatsRecommended}
            onChange={handleChange}
            min="1"
            max="10"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="foodSafety">Food Safety *</label>
          <select
            id="foodSafety"
            name="foodSafety"
            value={formData.foodSafety}
            onChange={handleChange}
            required
          >
            {Object.values(FOOD_SAFETY).map(safety => (
              <option key={safety} value={safety}>{safety}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Notes */}
      <div className="form-group">
        <label htmlFor="notes">Application Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Application tips, firing results, etc..."
          rows="3"
        />
      </div>

      {/* Form actions */}
      <div className="form-actions">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {isEditMode ? 'Update Glaze' : 'Add Glaze'}
        </Button>
      </div>
    </form>
  );
}

export default GlazeForm;
