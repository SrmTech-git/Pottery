/**
 * Glaze Service
 *
 * Handles all operations related to glazes in localStorage.
 */

import { getData, saveData } from './storageService';
import { createGlaze } from '../models/Glaze';

const STORAGE_KEY = 'glazes';

/**
 * Get all glazes
 * @returns {Array} Array of glaze objects
 */
export function getAllGlazes() {
  return getData(STORAGE_KEY);
}

/**
 * Get a glaze by ID
 * @param {number} id - The glaze ID
 * @returns {Object|null} The glaze object, or null if not found
 */
export function getGlazeById(id) {
  const glazes = getAllGlazes();
  return glazes.find(glaze => glaze.id === id) || null;
}

/**
 * Get all active glazes
 * @returns {Array} Array of active glazes
 */
export function getActiveGlazes() {
  const glazes = getAllGlazes();
  return glazes.filter(glaze => glaze.isActive);
}

/**
 * Get glazes by cone number
 * @param {string} coneNumber - Specific cone number (e.g., 'Cone 6')
 * @returns {Array} Array of glazes matching the cone number
 */
export function getGlazesByConeNumber(coneNumber) {
  const glazes = getActiveGlazes();
  return glazes.filter(glaze => glaze.coneNumber === coneNumber);
}

/**
 * Create a new glaze
 * @param {Object} glazeData - The glaze data
 * @returns {Object} The newly created glaze
 */
export function createNewGlaze(glazeData) {
  const glazes = getAllGlazes();

  // Generate unique ID by combining timestamp with random number
  const uniqueId = Date.now() + Math.random();

  const newGlaze = createGlaze({
    ...glazeData,
    id: uniqueId
  });

  glazes.push(newGlaze);
  saveData(STORAGE_KEY, glazes);

  return newGlaze;
}

/**
 * Update an existing glaze
 * @param {number} id - The glaze ID
 * @param {Object} updates - The fields to update
 * @returns {Object|null} The updated glaze, or null if not found
 */
export function updateGlaze(id, updates) {
  const glazes = getAllGlazes();
  const index = glazes.findIndex(glaze => glaze.id === id);

  if (index === -1) {
    return null;
  }

  glazes[index] = {
    ...glazes[index],
    ...updates,
    id,
    updatedAt: new Date().toISOString()
  };

  saveData(STORAGE_KEY, glazes);
  return glazes[index];
}

/**
 * Delete a glaze
 * @param {number} id - The glaze ID
 * @returns {boolean} True if deleted, false if not found
 */
export function deleteGlaze(id) {
  const glazes = getAllGlazes();
  const filtered = glazes.filter(glaze => glaze.id !== id);

  if (filtered.length === glazes.length) {
    return false;
  }

  saveData(STORAGE_KEY, filtered);
  return true;
}
