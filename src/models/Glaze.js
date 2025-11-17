/**
 * Glaze Model
 *
 * Represents different glazes that can be applied to pottery pieces.
 * Each glaze has specific firing temperature (cone number) and application details.
 *
 * This model is designed to be SQL-compatible for future database migration.
 */

import { CONE_NUMBERS } from './ClayType';

/**
 * Glaze finish options
 */
export const GLAZE_FINISH = {
  GLOSSY: 'glossy',
  MATTE: 'matte',
  SATIN: 'satin',
  CRYSTALLINE: 'crystalline',
  TEXTURED: 'textured'
};

/**
 * Food safety ratings
 */
export const FOOD_SAFETY = {
  FOOD_SAFE: 'food safe',
  NOT_FOOD_SAFE: 'not food safe',
  EXTERIOR_ONLY: 'exterior only',
  UNKNOWN: 'unknown'
};

/**
 * Example Glaze object structure
 * This will map to a SQL database table in the future
 */
export const GlazeModel = {
  id: 0,                              // PRIMARY KEY (auto-increment) - INT
  manufacturer: "",                   // VARCHAR(100) - Brand or maker (e.g., "AMACO", "Mayco")
  name: "",                           // VARCHAR(100) - Product name (e.g., "PC-25 Textured Turquoise")
  productCode: "",                    // VARCHAR(50) - Product code/number (e.g., "PC-25", "SW-402")
  description: "",                    // TEXT - Detailed description
  color: "",                          // VARCHAR(50) - Finished color (e.g., "Turquoise", "Iron Red")
  coneNumber: CONE_NUMBERS.CONE_6,   // VARCHAR(20) - Specific cone rating
  finish: GLAZE_FINISH.GLOSSY,       // VARCHAR(50) - Surface finish
  coatsRecommended: 3,                // INT - Recommended number of coats
  foodSafety: FOOD_SAFETY.UNKNOWN,   // VARCHAR(20) - Food safety rating
  isActive: true,                     // BOOLEAN - Whether this glaze is currently in use
  isFavorite: false,                  // BOOLEAN - Whether this glaze is marked as favorite
  notes: "",                          // TEXT - Application notes, tips, results
  createdAt: "",                      // TIMESTAMP - ISO date string
  updatedAt: ""                       // TIMESTAMP - ISO date string
};

/**
 * Creates a new Glaze object with default values
 * @param {Object} data - The glaze data
 * @returns {Object} A new glaze object
 */
export function createGlaze(data) {
  return {
    id: data.id || Date.now(),
    manufacturer: data.manufacturer || "",
    name: data.name || "",
    productCode: data.productCode || "",
    description: data.description || "",
    color: data.color || "",
    coneNumber: data.coneNumber || CONE_NUMBERS.CONE_6,
    finish: data.finish || GLAZE_FINISH.GLOSSY,
    coatsRecommended: data.coatsRecommended || 3,
    foodSafety: data.foodSafety || FOOD_SAFETY.UNKNOWN,
    isActive: data.isActive !== undefined ? data.isActive : true,
    isFavorite: data.isFavorite !== undefined ? data.isFavorite : false,
    notes: data.notes || "",
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt || new Date().toISOString()
  };
}
