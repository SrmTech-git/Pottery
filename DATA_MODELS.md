# Pottery Management System - Data Models

## Quick Reference

This document provides a quick overview of the data models used in the Pottery Management System.

## Model Summary

### ClayType
Different types of clay available for pottery making.

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| id | number | Unique identifier | 1 |
| name | string | Clay type name | "Stoneware" |
| description | string | Detailed description | "High-fire clay..." |
| temperature | string | "low" or "high" | "high" |
| color | string | "light", "dark", or "red" | "light" |
| isActive | boolean | Currently in use | true |
| createdAt | string | ISO timestamp | "2025-11-14T..." |
| updatedAt | string | ISO timestamp | "2025-11-14T..." |

### Glaze
Glazes that can be applied to pottery pieces.

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| id | number | Unique identifier | 1 |
| name | string | Glaze name | "Celadon" |
| description | string | Detailed description | "Pale green..." |
| color | string | Finished color | "pale green" |
| temperature | string | "low" or "high" | "high" |
| finish | string | Surface finish | "glossy" |
| manufacturer | string | Brand name | "AMACO" |
| isActive | boolean | Currently in use | true |
| notes | string | Application tips | "Apply thin..." |
| createdAt | string | ISO timestamp | "2025-11-14T..." |
| updatedAt | string | ISO timestamp | "2025-11-14T..." |

### PotteryPiece
A pottery piece being tracked through the creation process.

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| id | number | Unique identifier | 1 |
| name | string | Piece name | "Small Bowl" |
| clayTypeId | number | **FK → ClayType** | 2 |
| status | string | Current stage | "glazed" |
| formType | string | Type of piece | "bowl" |
| height | number | Height (inches/cm) | 3.5 |
| width | number | Width (inches/cm) | 6.0 |
| weight | number | Weight (lbs/kg) | 1.2 |
| notes | string | General notes | "Practice piece..." |
| imageUrl | string | Image path | "/images/..." |
| thrownDate | string | When created | "2025-11-10T..." |
| leatherDryDate | string | Leather dry date | "2025-11-11T..." |
| bisqueFiredDate | string | Bisque fire date | "2025-11-12T..." |
| glazedDate | string | Glazing date | "2025-11-13T..." |
| firedDate | string | Final fire date | "2025-11-14T..." |
| createdAt | string | ISO timestamp | "2025-11-10T..." |
| updatedAt | string | ISO timestamp | "2025-11-14T..." |

### PotteryPieceGlaze (Junction Table)
Links pottery pieces to their glazes (many-to-many relationship).

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| id | number | Unique identifier | 1 |
| potteryPieceId | number | **FK → PotteryPiece** | 1 |
| glazeId | number | **FK → Glaze** | 3 |
| applicationMethod | string | How applied | "dipped" |
| layers | number | Number of coats | 2 |
| applicationArea | string | Where applied | "exterior" |
| notes | string | Application notes | "Double-dipped..." |
| appliedDate | string | When applied | "2025-11-13T..." |
| createdAt | string | ISO timestamp | "2025-11-13T..." |
| updatedAt | string | ISO timestamp | "2025-11-13T..." |

## Status Workflow

Pottery pieces progress through these stages:

```
1. thrown          → Just created on the wheel
2. leather_dry     → Partially dried, can be trimmed
3. bisque_fired    → First firing complete (unglazed)
4. glazed          → Glaze applied
5. fired           → Final firing complete ✓ DONE
```

## Relationships

```
                     ┌──────────┐
                     │ ClayType │
                     └─────┬────┘
                           │
                           │ 1:many
                           │
                     ┌─────▼──────┐
          ┌──────────┤PotteryPiece├──────────┐
          │          └────────────┘          │
          │ many                         many│
          │                                   │
┌─────────▼──────────┐             ┌─────────▼─────┐
│PotteryPieceGlaze   │             │     Glaze     │
│  (Junction Table)  ├─────────────►               │
└────────────────────┘    many      └───────────────┘
```

## Example: Creating a Complete Pottery Piece

```javascript
// 1. Create or select a clay type
const stoneware = {
  id: 2,
  name: "Stoneware",
  temperature: "high",
  color: "light"
};

// 2. Create the pottery piece
const bowl = {
  id: 1,
  name: "Cereal Bowl",
  clayTypeId: 2,           // Uses Stoneware
  status: "thrown",
  formType: "bowl",
  height: 3.5,
  width: 6.0
};

// 3. Progress through stages
bowl.status = "leather_dry";
bowl.leatherDryDate = "2025-11-11T10:00:00Z";

bowl.status = "bisque_fired";
bowl.bisqueFiredDate = "2025-11-12T18:00:00Z";

// 4. Select glazes
const celadon = { id: 1, name: "Celadon", temperature: "high" };
const clearGloss = { id: 3, name: "Clear Gloss", temperature: "high" };

// 5. Apply glazes to the piece
const exteriorGlaze = {
  potteryPieceId: 1,      // The bowl
  glazeId: 1,             // Celadon
  applicationMethod: "dipped",
  applicationArea: "exterior",
  layers: 2
};

const interiorGlaze = {
  potteryPieceId: 1,      // The bowl
  glazeId: 3,             // Clear Gloss
  applicationMethod: "poured",
  applicationArea: "interior",
  layers: 1
};

// 6. Update status
bowl.status = "glazed";
bowl.glazedDate = "2025-11-13T14:00:00Z";

// 7. Final firing
bowl.status = "fired";
bowl.firedDate = "2025-11-14T18:00:00Z";

// Now the bowl is complete!
```

## Temperature Compatibility

**Important Rule:** Clay and glaze temperatures must match!

- **Low-fire clay** (cone 04-06) → **Low-fire glazes**
- **High-fire clay** (cone 8-10) → **High-fire glazes**

❌ Don't mix: High-fire glaze on low-fire clay (glaze won't melt properly)
❌ Don't mix: Low-fire glaze on high-fire clay (glaze will burn off)

## Form Types

Common pottery form types:
- bowl
- vase
- plate
- mug
- cup
- pitcher
- jar
- planter
- sculpture
- tile

## Application Methods

Ways to apply glaze:
- **dipped** - Submerge piece in glaze
- **brushed** - Paint on with brush
- **sprayed** - Spray gun application
- **poured** - Pour glaze over piece
- **sponged** - Apply with sponge

## Application Areas

Where glaze can be applied:
- **full** - Entire piece
- **exterior** - Outside only
- **interior** - Inside only
- **rim** - Top edge
- **base** - Bottom
- **partial** - Specific sections

---

**For detailed implementation, see:** `src/models/README.md`
