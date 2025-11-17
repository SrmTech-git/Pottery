/**
 * ClayType Model
 *
 * Represents different types of clay used in pottery.
 * Each clay type has manufacturer, cone number, and color information.
 *
 * This model is designed to be SQL-compatible for future database migration.
 */

/**
 * Clay color options (fired color)
 */
export const CLAY_COLORS = {
  WHITE: 'white',
  BUFF: 'buff',
  LIGHT_GRAY: 'light gray',
  GRAY: 'gray',
  BROWN: 'brown',
  RED: 'red',
  TERRA_COTTA: 'terra cotta',
  SPECKLED: 'speckled'
};

/**
 * Cone number options (firing temperature)
 * Common cone numbers in pottery
 */
export const CONE_NUMBERS = {
  CONE_04: 'Cone 04',  // ~1945°F / 1063°C - Low fire
  CONE_06: 'Cone 06',  // ~1830°F / 999°C - Low fire (earthenware)
  CONE_5: 'Cone 5',    // ~2167°F / 1186°C - Mid fire
  CONE_6: 'Cone 6',    // ~2232°F / 1222°C - Mid fire (common for stoneware)
  CONE_10: 'Cone 10',  // ~2381°F / 1305°C - High fire (stoneware/porcelain)
};

/**
 * Temperature categories (for backward compatibility and filtering)
 */
export const TEMPERATURE = {
  LOW: 'low',    // Cone 04-06
  MID: 'mid',    // Cone 5-6
  HIGH: 'high'   // Cone 8-10
};

/**
 * Example ClayType object structure
 * This will map to a SQL database table in the future
 */
export const ClayTypeModel = {
  id: 0,                              // PRIMARY KEY (auto-increment) - INT
  manufacturer: "",                   // VARCHAR(100) - e.g., "Laguna", "Standard Ceramic"
  name: "",                           // VARCHAR(100) - e.g., "B-Mix 5", "WC-617"
  description: "",                    // TEXT - Detailed description
  coneNumber: CONE_NUMBERS.CONE_6,   // VARCHAR(20) - Specific cone rating
  color: CLAY_COLORS.BUFF,           // VARCHAR(20) - Fired color
  shrinkage: 0,                       // DECIMAL(4,2) - Shrinkage percentage (optional)
  absorptionRate: 0,                  // DECIMAL(4,2) - Water absorption % (optional)
  isActive: true,                     // BOOLEAN - Whether this clay type is currently in use
  notes: "",                          // TEXT - Additional notes
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
    manufacturer: data.manufacturer || "",
    name: data.name || "",
    description: data.description || "",
    coneNumber: data.coneNumber || CONE_NUMBERS.CONE_6,
    color: data.color || CLAY_COLORS.BUFF,
    shrinkage: data.shrinkage || 0,
    absorptionRate: data.absorptionRate || 0,
    isActive: data.isActive !== undefined ? data.isActive : true,
    notes: data.notes || "",
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt || new Date().toISOString()
  };
}
