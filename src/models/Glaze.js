/**
 * Glaze Model
 *
 * Represents different glazes that can be applied to pottery pieces.
 * Each glaze has a temperature rating that must be compatible with the clay.
 *
 * This model is designed to be SQL-compatible for future database migration.
 */

import { TEMPERATURE } from './ClayType';

/**
 * Example Glaze object structure
 * This will map to a SQL database table in the future
 */
export const GlazeModel = {
  id: 0,                              // PRIMARY KEY (auto-increment) - INT
  name: "",                           // VARCHAR(100) - e.g., "Celadon", "Tenmoku"
  description: "",                    // TEXT - Detailed description
  color: "",                          // VARCHAR(50) - Finished color (e.g., "blue", "brown")
  temperature: TEMPERATURE.LOW,       // VARCHAR(10) - 'low' or 'high'
  finish: "",                         // VARCHAR(50) - e.g., "glossy", "matte", "satin"
  manufacturer: "",                   // VARCHAR(100) - Brand or maker
  isActive: true,                     // BOOLEAN - Whether this glaze is currently in use
  notes: "",                          // TEXT - Application notes, tips, etc.
  createdAt: "",                      // TIMESTAMP - ISO date string
  updatedAt: ""                       // TIMESTAMP - ISO date string
};

/**
 * Glaze finish options
 */
export const GLAZE_FINISH = {
  GLOSSY: 'glossy',
  MATTE: 'matte',
  SATIN: 'satin',
  CRYSTALLINE: 'crystalline'
};

/**
 * Creates a new Glaze object with default values
 * @param {Object} data - The glaze data
 * @returns {Object} A new glaze object
 */
export function createGlaze(data) {
  return {
    id: data.id || Date.now(),
    name: data.name || "",
    description: data.description || "",
    color: data.color || "",
    temperature: data.temperature || TEMPERATURE.LOW,
    finish: data.finish || GLAZE_FINISH.GLOSSY,
    manufacturer: data.manufacturer || "",
    isActive: data.isActive !== undefined ? data.isActive : true,
    notes: data.notes || "",
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt || new Date().toISOString()
  };
}
