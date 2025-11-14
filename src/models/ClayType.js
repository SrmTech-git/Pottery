/**
 * ClayType Model
 *
 * Represents different types of clay used in pottery.
 * Each clay type has a temperature rating (low or high) and a color.
 *
 * This model is designed to be SQL-compatible for future database migration.
 */

/**
 * Clay color options
 */
export const CLAY_COLORS = {
  LIGHT: 'light',
  DARK: 'dark',
  RED: 'red'
};

/**
 * Temperature options (used by both clay and glazes)
 */
export const TEMPERATURE = {
  LOW: 'low',    // Typically cone 04-06 (1850-1900°F)
  HIGH: 'high'   // Typically cone 8-10 (2300-2400°F)
};

/**
 * Example ClayType object structure
 * This will map to a SQL database table in the future
 */
export const ClayTypeModel = {
  id: 0,                              // PRIMARY KEY (auto-increment) - INT
  name: "",                           // VARCHAR(100) - e.g., "Earthenware", "Stoneware"
  description: "",                    // TEXT - Detailed description
  temperature: TEMPERATURE.LOW,       // VARCHAR(10) - 'low' or 'high'
  color: CLAY_COLORS.LIGHT,          // VARCHAR(10) - 'light', 'dark', or 'red'
  isActive: true,                     // BOOLEAN - Whether this clay type is currently in use
  createdAt: "",                      // TIMESTAMP - ISO date string
  updatedAt: ""                       // TIMESTAMP - ISO date string
};

/**
 * Creates a new ClayType object with default values
 * @param {Object} data - The clay type data
 * @returns {Object} A new clay type object
 */
export function createClayType(data) {
  return {
    id: data.id || Date.now(),
    name: data.name || "",
    description: data.description || "",
    temperature: data.temperature || TEMPERATURE.LOW,
    color: data.color || CLAY_COLORS.LIGHT,
    isActive: data.isActive !== undefined ? data.isActive : true,
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt || new Date().toISOString()
  };
}
