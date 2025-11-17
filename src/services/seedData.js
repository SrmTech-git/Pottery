/**
 * Seed Data Utility
 *
 * Provides sample data to help users understand the app.
 * This can be called on first run or manually to populate example data.
 */

import { createNewClayType } from './clayTypeService';
import { createNewGlaze } from './glazeService';
import { createNewPotteryPiece } from './potteryPieceService';
import { addGlazeToPiece } from './potteryPieceGlazeService';
import { CLAY_COLORS, CONE_NUMBERS, TEMPERATURE } from '../models/ClayType';
import { GLAZE_FINISH } from '../models/Glaze';
import { POTTERY_STATUS } from '../models/PotteryPiece';
import { APPLICATION_METHOD, APPLICATION_AREA } from '../models/PotteryPieceGlaze';

/**
 * Check if the app has any data
 * @returns {boolean} True if data exists, false if empty
 */
export function hasData() {
  const clayTypes = localStorage.getItem('clayTypes');
  const glazes = localStorage.getItem('glazes');
  const pieces = localStorage.getItem('potteryPieces');

  return !!(clayTypes || glazes || pieces);
}

/**
 * Clear all data from localStorage
 * Useful for resetting the app to a clean state
 */
export function clearAllData() {
  localStorage.removeItem('clayTypes');
  localStorage.removeItem('glazes');
  localStorage.removeItem('potteryPieces');
  localStorage.removeItem('potteryPieceGlazes');
  console.log('All data cleared from localStorage');
}

/**
 * Populate the app with sample data
 * This helps users understand how the app works
 */
export function seedSampleData() {
  console.log('Seeding sample data...');

  // Create clay types with real manufacturer data
  const earthenware = createNewClayType({
    manufacturer: "Standard Ceramic",
    name: "Earthenware No. 104",
    description: "Low-fire red earthenware with good plasticity. Ideal for handbuilding and sculpture.",
    coneNumber: CONE_NUMBERS.CONE_06,
    color: CLAY_COLORS.TERRA_COTTA,
    shrinkage: 6.5,
    absorptionRate: 12.5,
    notes: "Excellent for terra cotta planters and decorative pieces."
  });

  const stoneware = createNewClayType({
    manufacturer: "Laguna",
    name: "WC-617 Frost",
    description: "Smooth white stoneware with excellent throwing properties. Low iron content.",
    coneNumber: CONE_NUMBERS.CONE_6,
    color: CLAY_COLORS.WHITE,
    shrinkage: 12.0,
    absorptionRate: 2.0,
    notes: "Popular for functional ware. Works well on wheel and hand building."
  });

  const porcelain = createNewClayType({
    manufacturer: "Standard Ceramic",
    name: "Porcelain 365",
    description: "Pure white translucent porcelain. Excellent for throwing and hand building.",
    coneNumber: CONE_NUMBERS.CONE_10,
    color: CLAY_COLORS.WHITE,
    shrinkage: 13.5,
    absorptionRate: 0.5,
    notes: "Challenging but rewarding. Translucent when thin. Beautiful for fine dinnerware."
  });

  const bmix5 = createNewClayType({
    manufacturer: "Laguna",
    name: "B-Mix 5 w/ Grog",
    description: "Mid-range cone 5 clay with grog for added texture and strength. Versatile and forgiving.",
    coneNumber: CONE_NUMBERS.CONE_5,
    color: CLAY_COLORS.BUFF,
    shrinkage: 11.5,
    absorptionRate: 3.5,
    notes: "Great for beginners and professionals alike. Grog adds tooth for handbuilding."
  });

  const bmix10 = createNewClayType({
    manufacturer: "Laguna",
    name: "B-Mix 10",
    description: "Cone 10 high-fire smooth clay body. Excellent plasticity and workability.",
    coneNumber: CONE_NUMBERS.CONE_10,
    color: CLAY_COLORS.BUFF,
    shrinkage: 12.5,
    absorptionRate: 1.5,
    notes: "Popular for wheel throwing. Smooth texture, no grog. Great for dinnerware."
  });

  // Create glazes
  const celadon = createNewGlaze({
    name: "Celadon",
    description: "Traditional pale green glaze with subtle variations",
    color: "Pale Green",
    temperature: TEMPERATURE.HIGH,
    finish: GLAZE_FINISH.GLOSSY,
    manufacturer: "AMACO",
    notes: "Beautiful on porcelain and stoneware. Apply 2-3 coats for best results."
  });

  const tenmoku = createNewGlaze({
    name: "Tenmoku",
    description: "Iron-rich brown to black glaze",
    color: "Dark Brown",
    temperature: TEMPERATURE.HIGH,
    finish: GLAZE_FINISH.GLOSSY,
    manufacturer: "Mayco",
    notes: "Creates beautiful iron spots and variations. Thicker application gives darker results."
  });

  // Low-fire glaze for earthenware (not used in current seed data, but available)
  // eslint-disable-next-line no-unused-vars
  const clearGloss = createNewGlaze({
    name: "Clear Gloss",
    description: "Transparent glossy glaze",
    color: "Clear",
    temperature: TEMPERATURE.LOW,
    finish: GLAZE_FINISH.GLOSSY,
    manufacturer: "Duncan",
    notes: "Perfect for earthenware. Shows off clay color and any decorations."
  });

  const shino = createNewGlaze({
    name: "Shino",
    description: "Traditional Japanese glaze with orange-peel texture",
    color: "Orange-White",
    temperature: TEMPERATURE.HIGH,
    finish: GLAZE_FINISH.MATTE,
    manufacturer: "Custom Mix",
    notes: "Carbon trapping creates beautiful variations. Best in reduction firing."
  });

  // Create pottery pieces in various stages
  const piece1 = createNewPotteryPiece({
    name: "Morning Coffee Mug",
    clayTypeId: stoneware.id,
    status: POTTERY_STATUS.FIRED,
    formType: "mug",
    height: 4.5,
    width: 3.5,
    notes: "First attempt at a handled mug. Handle attachment could be smoother.",
    thrownDate: "2025-11-01T10:00:00Z",
    leatherDryDate: "2025-11-02T10:00:00Z",
    bisqueFiredDate: "2025-11-04T18:00:00Z",
    glazedDate: "2025-11-05T14:00:00Z",
    firedDate: "2025-11-07T20:00:00Z"
  });

  // Add glaze to the mug
  addGlazeToPiece({
    potteryPieceId: piece1.id,
    glazeId: tenmoku.id,
    applicationMethod: APPLICATION_METHOD.DIPPED,
    layers: 2,
    applicationArea: APPLICATION_AREA.EXTERIOR,
    notes: "Double-dipped for rich color",
    appliedDate: "2025-11-05T14:00:00Z"
  });

  addGlazeToPiece({
    potteryPieceId: piece1.id,
    glazeId: shino.id,
    applicationMethod: APPLICATION_METHOD.POURED,
    layers: 1,
    applicationArea: APPLICATION_AREA.INTERIOR,
    notes: "Poured and swirled inside",
    appliedDate: "2025-11-05T14:15:00Z"
  });

  const piece2 = createNewPotteryPiece({
    name: "Cereal Bowl",
    clayTypeId: stoneware.id,
    status: POTTERY_STATUS.GLAZED,
    formType: "bowl",
    height: 3.0,
    width: 6.0,
    notes: "Nice wide rim, good for breakfast bowls",
    thrownDate: "2025-11-08T10:00:00Z",
    leatherDryDate: "2025-11-09T10:00:00Z",
    bisqueFiredDate: "2025-11-11T18:00:00Z",
    glazedDate: "2025-11-12T14:00:00Z"
  });

  addGlazeToPiece({
    potteryPieceId: piece2.id,
    glazeId: celadon.id,
    applicationMethod: APPLICATION_METHOD.DIPPED,
    layers: 3,
    applicationArea: APPLICATION_AREA.FULL,
    notes: "Triple-dipped for deeper green",
    appliedDate: "2025-11-12T14:00:00Z"
  });

  createNewPotteryPiece({
    name: "Small Vase",
    clayTypeId: porcelain.id,
    status: POTTERY_STATUS.BISQUE_FIRED,
    formType: "vase",
    height: 6.0,
    width: 3.0,
    notes: "Thin walls, translucent effect. Waiting to decide on glaze.",
    thrownDate: "2025-11-10T10:00:00Z",
    leatherDryDate: "2025-11-11T10:00:00Z",
    bisqueFiredDate: "2025-11-13T18:00:00Z"
  });

  createNewPotteryPiece({
    name: "Dinner Plate",
    clayTypeId: stoneware.id,
    status: POTTERY_STATUS.LEATHER_DRY,
    formType: "plate",
    height: 1.0,
    width: 10.0,
    notes: "Large plate, need to trim the foot ring",
    thrownDate: "2025-11-13T10:00:00Z",
    leatherDryDate: "2025-11-14T10:00:00Z"
  });

  createNewPotteryPiece({
    name: "Decorative Bowl",
    clayTypeId: earthenware.id,
    status: POTTERY_STATUS.THROWN,
    formType: "bowl",
    height: 4.0,
    width: 8.0,
    notes: "Carved pattern on exterior. Still drying.",
    thrownDate: "2025-11-14T10:00:00Z"
  });

  console.log('Sample data seeded successfully!');
  console.log('Created:');
  console.log('- 5 clay types');
  console.log('- 4 glazes');
  console.log('- 5 pottery pieces in various stages');
}
