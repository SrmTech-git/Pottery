/**
 * ClayType Service
 *
 * Handles all operations related to clay types in localStorage.
 * This service will be easy to convert to API calls later.
 */

import { getData, saveData } from './storageService';
import { createClayType } from '../models/ClayType';

const STORAGE_KEY = 'clayTypes';

/**
 * Get all clay types
 * @returns {Array} Array of clay type objects
 */
export function getAllClayTypes() {
  return getData(STORAGE_KEY);
}

/**
 * Get a clay type by ID
 * @param {number} id - The clay type ID
 * @returns {Object|null} The clay type object, or null if not found
 */
export function getClayTypeById(id) {
  const clayTypes = getAllClayTypes();
  return clayTypes.find(type => type.id === id) || null;
}

/**
 * Get all active clay types
 * @returns {Array} Array of active clay types
 */
export function getActiveClayTypes() {
  const clayTypes = getAllClayTypes();
  return clayTypes.filter(type => type.isActive);
}

/**
 * Create a new clay type
 * @param {Object} clayTypeData - The clay type data
 * @returns {Object} The newly created clay type
 */
export function createNewClayType(clayTypeData) {
  const clayTypes = getAllClayTypes();

  // Create new clay type with auto-generated ID
  const newClayType = createClayType({
    ...clayTypeData,
    id: Date.now() // Simple ID generation
  });

  clayTypes.push(newClayType);
  saveData(STORAGE_KEY, clayTypes);

  return newClayType;
}

/**
 * Update an existing clay type
 * @param {number} id - The clay type ID
 * @param {Object} updates - The fields to update
 * @returns {Object|null} The updated clay type, or null if not found
 */
export function updateClayType(id, updates) {
  const clayTypes = getAllClayTypes();
  const index = clayTypes.findIndex(type => type.id === id);

  if (index === -1) {
    return null;
  }

  // Update the clay type with new data and updated timestamp
  clayTypes[index] = {
    ...clayTypes[index],
    ...updates,
    id, // Don't allow ID changes
    updatedAt: new Date().toISOString()
  };

  saveData(STORAGE_KEY, clayTypes);
  return clayTypes[index];
}

/**
 * Delete a clay type
 * @param {number} id - The clay type ID
 * @returns {boolean} True if deleted, false if not found
 */
export function deleteClayType(id) {
  const clayTypes = getAllClayTypes();
  const filtered = clayTypes.filter(type => type.id !== id);

  // If no items were removed, the ID didn't exist
  if (filtered.length === clayTypes.length) {
    return false;
  }

  saveData(STORAGE_KEY, filtered);
  return true;
}
