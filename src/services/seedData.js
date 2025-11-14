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
import { CLAY_COLORS, TEMPERATURE } from '../models/ClayType';
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
 * Populate the app with sample data
 * This helps users understand how the app works
 */
export function seedSampleData() {
  console.log('Seeding sample data...');

  // Create clay types
  const earthenware = createNewClayType({
    name: "Earthenware",
    description: "Low-fire clay, porous and easy to work with. Great for beginners.",
    temperature: TEMPERATURE.LOW,
    color: CLAY_COLORS.RED
  });

  const stoneware = createNewClayType({
    name: "Stoneware",
    description: "High-fire clay, durable and vitrified. Perfect for functional ware.",
    temperature: TEMPERATURE.HIGH,
    color: CLAY_COLORS.LIGHT
  });

  const porcelain = createNewClayType({
    name: "Porcelain",
    description: "High-fire white clay, translucent when thin. Beautiful but challenging.",
    temperature: TEMPERATURE.HIGH,
    color: CLAY_COLORS.LIGHT
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
  console.log('- 3 clay types');
  console.log('- 4 glazes');
  console.log('- 5 pottery pieces in various stages');
}
