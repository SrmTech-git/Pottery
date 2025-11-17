/**
 * PotteryPiece Service
 *
 * Handles all operations related to pottery pieces in localStorage.
 * Includes helper functions for status progression and relationships.
 */

import { getData, saveData } from './storageService';
import { createPotteryPiece, getNextStatus, isPieceComplete, POTTERY_STATUS } from '../models/PotteryPiece';
import { getClayTypeById } from './clayTypeService';

const STORAGE_KEY = 'potteryPieces';

/**
 * Get all pottery pieces
 * @returns {Array} Array of pottery piece objects
 */
export function getAllPotteryPieces() {
  return getData(STORAGE_KEY);
}

/**
 * Get a pottery piece by ID
 * @param {number} id - The pottery piece ID
 * @returns {Object|null} The pottery piece object, or null if not found
 */
export function getPotteryPieceById(id) {
  const pieces = getAllPotteryPieces();
  return pieces.find(piece => piece.id === id) || null;
}

/**
 * Get pottery pieces by status
 * @param {string} status - The status to filter by
 * @returns {Array} Array of pottery pieces with matching status
 */
export function getPotteryPiecesByStatus(status) {
  const pieces = getAllPotteryPieces();
  return pieces.filter(piece => piece.status === status);
}

/**
 * Get all in-progress pieces (not yet fired)
 * @returns {Array} Array of pottery pieces that are not complete
 */
export function getInProgressPieces() {
  const pieces = getAllPotteryPieces();
  return pieces.filter(piece => !isPieceComplete(piece));
}

/**
 * Get all completed pieces (fired)
 * @returns {Array} Array of completed pottery pieces
 */
export function getCompletedPieces() {
  const pieces = getAllPotteryPieces();
  return pieces.filter(piece => isPieceComplete(piece));
}

/**
 * Get pottery piece with its clay type information
 * @param {number} id - The pottery piece ID
 * @returns {Object|null} The pottery piece with clay type data, or null if not found
 */
export function getPotteryPieceWithClayType(id) {
  const piece = getPotteryPieceById(id);
  if (!piece) {
    return null;
  }

  const clayType = getClayTypeById(piece.clayTypeId);

  return {
    ...piece,
    clayType // Include full clay type object
  };
}

/**
 * Create a new pottery piece
 * @param {Object} pieceData - The pottery piece data
 * @returns {Object} The newly created pottery piece
 */
export function createNewPotteryPiece(pieceData) {
  const pieces = getAllPotteryPieces();

  // Generate unique ID by combining timestamp with random number
  // This ensures uniqueness even when creating multiple pieces quickly
  const uniqueId = Date.now() + Math.random();

  const newPiece = createPotteryPiece({
    ...pieceData,
    id: uniqueId
  });

  pieces.push(newPiece);
  saveData(STORAGE_KEY, pieces);

  return newPiece;
}

/**
 * Update an existing pottery piece
 * @param {number} id - The pottery piece ID
 * @param {Object} updates - The fields to update
 * @returns {Object|null} The updated pottery piece, or null if not found
 */
export function updatePotteryPiece(id, updates) {
  const pieces = getAllPotteryPieces();
  const index = pieces.findIndex(piece => piece.id === id);

  if (index === -1) {
    return null;
  }

  pieces[index] = {
    ...pieces[index],
    ...updates,
    id,
    updatedAt: new Date().toISOString()
  };

  saveData(STORAGE_KEY, pieces);
  return pieces[index];
}

/**
 * Advance a pottery piece to the next status
 * Automatically sets the appropriate date field
 * @param {number} id - The pottery piece ID
 * @returns {Object|null} The updated pottery piece, or null if not found or already complete
 */
export function advancePieceStatus(id) {
  const piece = getPotteryPieceById(id);

  if (!piece) {
    return null;
  }

  const nextStatus = getNextStatus(piece.status);

  if (!nextStatus) {
    // Already at final status
    return null;
  }

  const now = new Date().toISOString();
  const updates = { status: nextStatus };

  // Set the appropriate date field based on new status
  switch (nextStatus) {
    case POTTERY_STATUS.LEATHER_DRY:
      updates.leatherDryDate = now;
      break;
    case POTTERY_STATUS.BISQUE_FIRED:
      updates.bisqueFiredDate = now;
      break;
    case POTTERY_STATUS.GLAZED:
      updates.glazedDate = now;
      break;
    case POTTERY_STATUS.FIRED:
      updates.firedDate = now;
      break;
    default:
      break;
  }

  return updatePotteryPiece(id, updates);
}

/**
 * Delete a pottery piece
 * @param {number} id - The pottery piece ID
 * @returns {boolean} True if deleted, false if not found
 */
export function deletePotteryPiece(id) {
  const pieces = getAllPotteryPieces();
  const filtered = pieces.filter(piece => piece.id !== id);

  if (filtered.length === pieces.length) {
    return false;
  }

  saveData(STORAGE_KEY, filtered);
  return true;
}

/**
 * Get all non-archived pottery pieces
 * @returns {Array} Array of pottery pieces that are not archived
 */
export function getActivePotteryPieces() {
  const pieces = getAllPotteryPieces();
  return pieces.filter(piece => !piece.isArchived);
}

/**
 * Get all archived pottery pieces
 * @returns {Array} Array of archived pottery pieces
 */
export function getArchivedPotteryPieces() {
  const pieces = getAllPotteryPieces();
  return pieces.filter(piece => piece.isArchived);
}

/**
 * Archive a pottery piece
 * @param {number} id - The pottery piece ID
 * @returns {Object|null} The updated pottery piece, or null if not found
 */
export function archivePotteryPiece(id) {
  return updatePotteryPiece(id, { isArchived: true });
}

/**
 * Unarchive a pottery piece
 * @param {number} id - The pottery piece ID
 * @returns {Object|null} The updated pottery piece, or null if not found
 */
export function unarchivePotteryPiece(id) {
  return updatePotteryPiece(id, { isArchived: false });
}

/**
 * Get all favorite pottery pieces (including archived)
 * @param {number} limit - Optional limit on number of pieces (default: 10)
 * @returns {Array} Array of favorite pottery pieces
 */
export function getFavoritePotteryPieces(limit = 10) {
  const pieces = getAllPotteryPieces();
  return pieces.filter(piece => piece.isFavorite).slice(0, limit);
}

/**
 * Toggle favorite status of a pottery piece
 * @param {number} id - The pottery piece ID
 * @returns {Object|null} The updated pottery piece, or null if not found
 */
export function toggleFavoritePotteryPiece(id) {
  const piece = getPotteryPieceById(id);
  if (!piece) {
    return null;
  }

  return updatePotteryPiece(id, { isFavorite: !piece.isFavorite });
}
