/**
 * PotteryPieceGlaze Service
 *
 * Handles the many-to-many relationship between pottery pieces and glazes.
 * Allows tracking multiple glazes on a single piece.
 */

import { getData, saveData } from './storageService';
import { createPotteryPieceGlaze } from '../models/PotteryPieceGlaze';
import { getGlazeById } from './glazeService';

const STORAGE_KEY = 'potteryPieceGlazes';

/**
 * Get all pottery piece glaze relationships
 * @returns {Array} Array of pottery piece glaze objects
 */
export function getAllPotteryPieceGlazes() {
  return getData(STORAGE_KEY);
}

/**
 * Get all glazes applied to a specific pottery piece
 * @param {number} potteryPieceId - The pottery piece ID
 * @returns {Array} Array of glaze objects with application details
 */
export function getGlazesForPiece(potteryPieceId) {
  const allRelationships = getAllPotteryPieceGlazes();
  const pieceGlazes = allRelationships.filter(
    pg => pg.potteryPieceId === potteryPieceId
  );

  // Map to full glaze objects with application details
  return pieceGlazes.map(pg => {
    const glaze = getGlazeById(pg.glazeId);
    return {
      ...glaze,
      relationshipId: pg.id, // Include the relationship ID for deletion
      applicationDetails: {
        applicationMethod: pg.applicationMethod,
        layers: pg.layers,
        applicationArea: pg.applicationArea,
        notes: pg.notes,
        appliedDate: pg.appliedDate
      }
    };
  }).filter(item => item.id !== undefined); // Filter out null glazes
}

/**
 * Get all pottery pieces that use a specific glaze
 * @param {number} glazeId - The glaze ID
 * @returns {Array} Array of pottery piece IDs using this glaze
 */
export function getPiecesUsingGlaze(glazeId) {
  const allRelationships = getAllPotteryPieceGlazes();
  return allRelationships
    .filter(pg => pg.glazeId === glazeId)
    .map(pg => pg.potteryPieceId);
}

/**
 * Add a glaze to a pottery piece
 * @param {Object} glazeApplicationData - The glaze application data
 * @returns {Object} The newly created relationship
 */
export function addGlazeToPiece(glazeApplicationData) {
  const relationships = getAllPotteryPieceGlazes();

  const newRelationship = createPotteryPieceGlaze({
    ...glazeApplicationData,
    id: Date.now() + Math.random() // Ensure uniqueness
  });

  relationships.push(newRelationship);
  saveData(STORAGE_KEY, relationships);

  return newRelationship;
}

/**
 * Update a glaze application
 * @param {number} relationshipId - The pottery piece glaze relationship ID
 * @param {Object} updates - The fields to update
 * @returns {Object|null} The updated relationship, or null if not found
 */
export function updateGlazeApplication(relationshipId, updates) {
  const relationships = getAllPotteryPieceGlazes();
  const index = relationships.findIndex(pg => pg.id === relationshipId);

  if (index === -1) {
    return null;
  }

  relationships[index] = {
    ...relationships[index],
    ...updates,
    id: relationshipId,
    updatedAt: new Date().toISOString()
  };

  saveData(STORAGE_KEY, relationships);
  return relationships[index];
}

/**
 * Remove a glaze from a pottery piece
 * @param {number} relationshipId - The pottery piece glaze relationship ID
 * @returns {boolean} True if deleted, false if not found
 */
export function removeGlazeFromPiece(relationshipId) {
  const relationships = getAllPotteryPieceGlazes();
  const filtered = relationships.filter(pg => pg.id !== relationshipId);

  if (filtered.length === relationships.length) {
    return false;
  }

  saveData(STORAGE_KEY, filtered);
  return true;
}

/**
 * Remove all glazes from a pottery piece
 * Useful when deleting a piece or starting over with glazing
 * @param {number} potteryPieceId - The pottery piece ID
 * @returns {number} The number of glaze applications removed
 */
export function removeAllGlazesFromPiece(potteryPieceId) {
  const relationships = getAllPotteryPieceGlazes();
  const original = relationships.length;
  const filtered = relationships.filter(pg => pg.potteryPieceId !== potteryPieceId);

  saveData(STORAGE_KEY, filtered);
  return original - filtered.length;
}
