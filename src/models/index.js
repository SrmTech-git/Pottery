/**
 * Data Models Index
 *
 * This file exports all data models and provides example data
 * to help understand the structure and relationships.
 */

// Export all models and their helper functions
export * from './ClayType';
export * from './Glaze';
export * from './PotteryPiece';
export * from './PotteryPieceGlaze';

// Import for creating example data
import { createClayType, CLAY_COLORS, TEMPERATURE } from './ClayType';
import { createGlaze, GLAZE_FINISH } from './Glaze';
import { createPotteryPiece, POTTERY_STATUS } from './PotteryPiece';
import { createPotteryPieceGlaze, APPLICATION_METHOD, APPLICATION_AREA } from './PotteryPieceGlaze';

/**
 * Example clay types
 * These demonstrate the different clay options available
 */
export const EXAMPLE_CLAY_TYPES = [
  createClayType({
    id: 1,
    name: "Earthenware",
    description: "Low-fire clay, porous and easy to work with",
    temperature: TEMPERATURE.LOW,
    color: CLAY_COLORS.RED
  }),
  createClayType({
    id: 2,
    name: "Stoneware",
    description: "High-fire clay, durable and vitrified",
    temperature: TEMPERATURE.HIGH,
    color: CLAY_COLORS.LIGHT
  }),
  createClayType({
    id: 3,
    name: "Porcelain",
    description: "High-fire white clay, translucent when thin",
    temperature: TEMPERATURE.HIGH,
    color: CLAY_COLORS.LIGHT
  })
];

/**
 * Example glazes
 * These demonstrate different glaze options
 */
export const EXAMPLE_GLAZES = [
  createGlaze({
    id: 1,
    name: "Celadon",
    description: "Traditional pale green glaze",
    color: "pale green",
    temperature: TEMPERATURE.HIGH,
    finish: GLAZE_FINISH.GLOSSY,
    manufacturer: "AMACO"
  }),
  createGlaze({
    id: 2,
    name: "Tenmoku",
    description: "Iron-rich brown to black glaze",
    color: "dark brown",
    temperature: TEMPERATURE.HIGH,
    finish: GLAZE_FINISH.GLOSSY,
    manufacturer: "Mayco"
  }),
  createGlaze({
    id: 3,
    name: "Clear Gloss",
    description: "Transparent glossy glaze",
    color: "clear",
    temperature: TEMPERATURE.LOW,
    finish: GLAZE_FINISH.GLOSSY,
    manufacturer: "Duncan"
  })
];

/**
 * Example pottery piece
 * This demonstrates a piece in progress
 */
export const EXAMPLE_POTTERY_PIECE = createPotteryPiece({
  id: 1,
  name: "Small Bowl",
  clayTypeId: 2, // Stoneware
  status: POTTERY_STATUS.GLAZED,
  formType: "bowl",
  height: 3.5,
  width: 6.0,
  notes: "Practice piece with carved exterior pattern",
  thrownDate: "2025-11-10T10:00:00Z",
  leatherDryDate: "2025-11-11T10:00:00Z",
  bisqueFiredDate: "2025-11-12T18:00:00Z",
  glazedDate: "2025-11-13T14:00:00Z"
});

/**
 * Example glaze application
 * This shows how a glaze is applied to a piece
 */
export const EXAMPLE_GLAZE_APPLICATION = createPotteryPieceGlaze({
  id: 1,
  potteryPieceId: 1, // Small Bowl
  glazeId: 1, // Celadon
  applicationMethod: APPLICATION_METHOD.DIPPED,
  layers: 2,
  applicationArea: APPLICATION_AREA.FULL,
  notes: "Double-dipped for richer color",
  appliedDate: "2025-11-13T14:00:00Z"
});

/**
 * Data Model Relationships Overview
 *
 * ClayType (1) ----< (many) PotteryPiece
 *   One clay type can be used for many pottery pieces
 *
 * PotteryPiece (many) >----< (many) Glaze
 *   Through the PotteryPieceGlaze junction table
 *   One piece can have multiple glazes
 *   One glaze can be used on multiple pieces
 *
 * Example:
 *   - A bowl (PotteryPiece) is made with Stoneware (ClayType)
 *   - That bowl has Celadon glaze on the exterior (PotteryPieceGlaze)
 *   - And Clear gloss on the interior (PotteryPieceGlaze)
 */
