/**
 * PotteryPieceGlaze Model (Junction Table)
 *
 * This represents the many-to-many relationship between pottery pieces and glazes.
 * One pottery piece can have multiple glazes applied (e.g., different areas,
 * layers, or techniques), and one glaze can be used on many pieces.
 *
 * In SQL, this is called a junction table or join table.
 *
 * This model is designed to be SQL-compatible for future database migration.
 */

/**
 * Example PotteryPieceGlaze object structure
 * This will map to a SQL junction table in the future
 */
export const PotteryPieceGlazeModel = {
  id: 0,                              // PRIMARY KEY (auto-increment) - INT
  potteryPieceId: 0,                  // FOREIGN KEY - References PotteryPiece.id - INT
  glazeId: 0,                         // FOREIGN KEY - References Glaze.id - INT
  applicationMethod: "",              // VARCHAR(100) - e.g., "dipped", "brushed", "sprayed"
  layers: 1,                          // INT - Number of coats/layers applied
  applicationArea: "",                // VARCHAR(100) - e.g., "exterior", "interior", "rim"
  notes: "",                          // TEXT - Application notes
  appliedDate: "",                    // TIMESTAMP - When glaze was applied
  createdAt: "",                      // TIMESTAMP - ISO date string
  updatedAt: ""                       // TIMESTAMP - ISO date string
};

/**
 * Application method options
 */
export const APPLICATION_METHOD = {
  DIPPED: 'dipped',
  BRUSHED: 'brushed',
  SPRAYED: 'sprayed',
  POURED: 'poured',
  SPONGED: 'sponged'
};

/**
 * Application area options
 */
export const APPLICATION_AREA = {
  EXTERIOR: 'exterior',
  INTERIOR: 'interior',
  RIM: 'rim',
  BASE: 'base',
  FULL: 'full',
  PARTIAL: 'partial'
};

/**
 * Creates a new PotteryPieceGlaze relationship object
 * @param {Object} data - The glaze application data
 * @returns {Object} A new pottery piece glaze relationship
 */
export function createPotteryPieceGlaze(data) {
  const now = new Date().toISOString();

  return {
    id: data.id || Date.now() + Math.random(), // Ensure uniqueness
    potteryPieceId: data.potteryPieceId || null,
    glazeId: data.glazeId || null,
    applicationMethod: data.applicationMethod || APPLICATION_METHOD.DIPPED,
    layers: data.layers || 1,
    applicationArea: data.applicationArea || APPLICATION_AREA.FULL,
    notes: data.notes || "",
    appliedDate: data.appliedDate || now,
    createdAt: data.createdAt || now,
    updatedAt: data.updatedAt || now
  };
}

/**
 * Helper function to get all glazes for a pottery piece
 * (This will be implemented in the service layer)
 * @param {number} potteryPieceId - The pottery piece ID
 * @param {Array} allGlazes - Array of all glaze objects
 * @param {Array} allPotteryPieceGlazes - Array of all pottery-glaze relationships
 * @returns {Array} Array of glaze objects with application details
 */
export function getGlazesForPiece(potteryPieceId, allGlazes, allPotteryPieceGlazes) {
  // Find all glaze relationships for this piece
  const pieceGlazes = allPotteryPieceGlazes.filter(
    pg => pg.potteryPieceId === potteryPieceId
  );

  // Map to full glaze objects with application details
  return pieceGlazes.map(pg => {
    const glaze = allGlazes.find(g => g.id === pg.glazeId);
    return {
      ...glaze,
      applicationDetails: {
        applicationMethod: pg.applicationMethod,
        layers: pg.layers,
        applicationArea: pg.applicationArea,
        notes: pg.notes,
        appliedDate: pg.appliedDate
      }
    };
  });
}
