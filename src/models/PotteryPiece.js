/**
 * PotteryPiece Model
 *
 * Represents a pottery piece being tracked through the creation process.
 * Each piece has a status that progresses from thrown to fired (complete).
 *
 * This model is designed to be SQL-compatible for future database migration.
 */

/**
 * Status options for pottery pieces
 * These represent the stages in the pottery creation process
 */
export const POTTERY_STATUS = {
  THROWN: 'thrown',               // Just created on the wheel or formed
  LEATHER_DRY: 'leather_dry',     // Partially dried, can be trimmed/carved
  BISQUE_FIRED: 'bisque_fired',   // First firing (unglazed)
  GLAZED: 'glazed',               // Glaze applied, waiting for final firing
  FIRED: 'fired'                  // Complete - final firing done
};

/**
 * Display names for status values
 * Used for showing user-friendly names in the UI
 */
export const STATUS_DISPLAY_NAMES = {
  [POTTERY_STATUS.THROWN]: 'Thrown',
  [POTTERY_STATUS.LEATHER_DRY]: 'Leather Dry',
  [POTTERY_STATUS.BISQUE_FIRED]: 'Bisque Fired',
  [POTTERY_STATUS.GLAZED]: 'Glazed',
  [POTTERY_STATUS.FIRED]: 'Fired (Complete)'
};

/**
 * Example PotteryPiece object structure
 * This will map to a SQL database table in the future
 */
export const PotteryPieceModel = {
  id: 0,                              // PRIMARY KEY (auto-increment) - INT
  name: "",                           // VARCHAR(200) - Name or description of piece
  clayTypeId: 0,                      // FOREIGN KEY - References ClayType.id - INT
  status: POTTERY_STATUS.THROWN,      // VARCHAR(20) - Current status in process
  formType: "",                       // VARCHAR(100) - e.g., "bowl", "vase", "plate"
  height: 0,                          // DECIMAL(10,2) - Height in inches or cm
  width: 0,                           // DECIMAL(10,2) - Width/diameter in inches or cm
  weight: 0,                          // DECIMAL(10,2) - Weight in pounds or kg (optional)
  notes: "",                          // TEXT - Any notes about the piece
  imageUrl: "",                       // VARCHAR(500) - Path to image (optional)
  isArchived: false,                  // BOOLEAN - Whether piece is archived
  thrownDate: "",                     // TIMESTAMP - When piece was thrown
  leatherDryDate: null,               // TIMESTAMP - When it reached leather dry stage
  bisqueFiredDate: null,              // TIMESTAMP - When bisque firing completed
  glazedDate: null,                   // TIMESTAMP - When glazing was completed
  firedDate: null,                    // TIMESTAMP - When final firing completed
  createdAt: "",                      // TIMESTAMP - ISO date string
  updatedAt: ""                       // TIMESTAMP - ISO date string
};

/**
 * Creates a new PotteryPiece object with default values
 * @param {Object} data - The pottery piece data
 * @returns {Object} A new pottery piece object
 */
export function createPotteryPiece(data) {
  const now = new Date().toISOString();

  return {
    id: data.id || Date.now(),
    name: data.name || "",
    clayTypeId: data.clayTypeId || null,
    status: data.status || POTTERY_STATUS.THROWN,
    formType: data.formType || "",
    height: data.height || 0,
    width: data.width || 0,
    weight: data.weight || 0,
    notes: data.notes || "",
    imageUrl: data.imageUrl || "",
    isArchived: data.isArchived !== undefined ? data.isArchived : false,
    thrownDate: data.thrownDate || now,
    leatherDryDate: data.leatherDryDate || null,
    bisqueFiredDate: data.bisqueFiredDate || null,
    glazedDate: data.glazedDate || null,
    firedDate: data.firedDate || null,
    createdAt: data.createdAt || now,
    updatedAt: data.updatedAt || now
  };
}

/**
 * Helper function to get the next status in the pottery process
 * @param {string} currentStatus - The current status
 * @returns {string|null} The next status, or null if already complete
 */
export function getNextStatus(currentStatus) {
  const statusOrder = [
    POTTERY_STATUS.THROWN,
    POTTERY_STATUS.LEATHER_DRY,
    POTTERY_STATUS.BISQUE_FIRED,
    POTTERY_STATUS.GLAZED,
    POTTERY_STATUS.FIRED
  ];

  const currentIndex = statusOrder.indexOf(currentStatus);

  // If already at the last status or status not found, return null
  if (currentIndex === -1 || currentIndex === statusOrder.length - 1) {
    return null;
  }

  return statusOrder[currentIndex + 1];
}

/**
 * Helper function to check if a piece is complete
 * @param {Object} piece - The pottery piece object
 * @returns {boolean} True if the piece is fired (complete)
 */
export function isPieceComplete(piece) {
  return piece.status === POTTERY_STATUS.FIRED;
}

/**
 * Helper function to get progress percentage based on status
 * @param {string} status - The current status
 * @returns {number} Progress percentage (0-100)
 */
export function getProgressPercentage(status) {
  const progressMap = {
    [POTTERY_STATUS.THROWN]: 20,
    [POTTERY_STATUS.LEATHER_DRY]: 40,
    [POTTERY_STATUS.BISQUE_FIRED]: 60,
    [POTTERY_STATUS.GLAZED]: 80,
    [POTTERY_STATUS.FIRED]: 100
  };

  return progressMap[status] || 0;
}
