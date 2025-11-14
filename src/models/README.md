# Data Models

This directory contains the data model definitions for the Pottery Management System.

## Overview

The data models are designed to be **SQL-compatible** for future migration to a relational database with a Java backend. Even though we currently use localStorage, all models follow SQL best practices.

## Models

### 1. ClayType (`ClayType.js`)

Represents different types of clay available for pottery.

**Properties:**
- `id` - Unique identifier
- `name` - Clay type name (e.g., "Earthenware", "Stoneware", "Porcelain")
- `description` - Detailed description
- `temperature` - Firing temperature: `'low'` or `'high'`
- `color` - Clay color: `'light'`, `'dark'`, or `'red'`
- `isActive` - Whether currently in use
- `createdAt` / `updatedAt` - Timestamps

**Example:**
```javascript
{
  id: 1,
  name: "Stoneware",
  description: "High-fire clay, durable and vitrified",
  temperature: "high",
  color: "light",
  isActive: true,
  createdAt: "2025-11-14T10:00:00Z",
  updatedAt: "2025-11-14T10:00:00Z"
}
```

### 2. Glaze (`Glaze.js`)

Represents glazes that can be applied to pottery pieces.

**Properties:**
- `id` - Unique identifier
- `name` - Glaze name (e.g., "Celadon", "Tenmoku")
- `description` - Detailed description
- `color` - Finished color after firing
- `temperature` - Firing temperature: `'low'` or `'high'`
- `finish` - Surface finish: `'glossy'`, `'matte'`, `'satin'`, etc.
- `manufacturer` - Brand or maker
- `isActive` - Whether currently in use
- `notes` - Application notes and tips
- `createdAt` / `updatedAt` - Timestamps

**Important:** Glaze temperature must be compatible with clay temperature!

### 3. PotteryPiece (`PotteryPiece.js`)

Represents a pottery piece being tracked through the creation process.

**Status Workflow:**
1. `thrown` - Just created on the wheel
2. `leather_dry` - Partially dried, ready for trimming
3. `bisque_fired` - First firing complete (unglazed)
4. `glazed` - Glaze applied
5. `fired` - Final firing complete (FINISHED!)

**Properties:**
- `id` - Unique identifier
- `name` - Name or description of the piece
- `clayTypeId` - **Foreign key** to ClayType
- `status` - Current stage in the process
- `formType` - Type of piece (bowl, vase, plate, etc.)
- `height` / `width` / `weight` - Dimensions
- `notes` - General notes
- `imageUrl` - Optional image path
- `thrownDate` - When piece was created
- `leatherDryDate` - When it reached leather dry stage
- `bisqueFiredDate` - When bisque firing completed
- `glazedDate` - When glazing was completed
- `firedDate` - When final firing completed
- `createdAt` / `updatedAt` - Timestamps

**Helper Functions:**
- `getNextStatus(currentStatus)` - Get the next step
- `isPieceComplete(piece)` - Check if piece is finished

### 4. PotteryPieceGlaze (`PotteryPieceGlaze.js`)

**Junction table** representing the many-to-many relationship between pottery pieces and glazes.

**Why we need this:** One pottery piece can have multiple glazes (e.g., different glaze on interior vs exterior), and one glaze can be used on many pieces.

**Properties:**
- `id` - Unique identifier
- `potteryPieceId` - **Foreign key** to PotteryPiece
- `glazeId` - **Foreign key** to Glaze
- `applicationMethod` - How applied: `'dipped'`, `'brushed'`, `'sprayed'`, etc.
- `layers` - Number of coats applied
- `applicationArea` - Where applied: `'exterior'`, `'interior'`, `'rim'`, etc.
- `notes` - Application notes
- `appliedDate` - When applied
- `createdAt` / `updatedAt` - Timestamps

## Relationships

```
ClayType (1) ----< (many) PotteryPiece
  One clay type can be used for many pottery pieces

PotteryPiece (many) >----< (many) Glaze
  Via PotteryPieceGlaze junction table
  One piece can have multiple glazes
  One glaze can be used on multiple pieces
```

## Example Usage

### Creating a new clay type:
```javascript
import { createClayType, CLAY_COLORS, TEMPERATURE } from './models';

const newClay = createClayType({
  name: "Porcelain",
  description: "Fine white clay",
  temperature: TEMPERATURE.HIGH,
  color: CLAY_COLORS.LIGHT
});
```

### Creating a pottery piece:
```javascript
import { createPotteryPiece, POTTERY_STATUS } from './models';

const newPiece = createPotteryPiece({
  name: "Tea Bowl",
  clayTypeId: 2, // Stoneware
  status: POTTERY_STATUS.THROWN,
  formType: "bowl",
  height: 3.5,
  width: 4.0
});
```

### Applying glaze to a piece:
```javascript
import { createPotteryPieceGlaze, APPLICATION_METHOD } from './models';

const glazeApplication = createPotteryPieceGlaze({
  potteryPieceId: 1,
  glazeId: 3,
  applicationMethod: APPLICATION_METHOD.DIPPED,
  applicationArea: APPLICATION_AREA.EXTERIOR,
  layers: 2
});
```

## SQL Migration

When migrating to SQL database:

1. **ClayType** table will have columns matching the model properties
2. **Glaze** table will have columns matching the model properties
3. **PotteryPiece** table will have `clayTypeId` as FOREIGN KEY to ClayType
4. **PotteryPieceGlaze** junction table will have FOREIGN KEYs to both PotteryPiece and Glaze

All timestamps use ISO 8601 format which is compatible with SQL TIMESTAMP columns.

## Constants

All models export helpful constants:

- `CLAY_COLORS` - Available clay colors
- `TEMPERATURE` - Temperature options (low/high)
- `POTTERY_STATUS` - Status workflow stages
- `STATUS_DISPLAY_NAMES` - User-friendly status names
- `GLAZE_FINISH` - Finish types
- `APPLICATION_METHOD` - How glaze is applied
- `APPLICATION_AREA` - Where glaze is applied

Use these constants instead of hardcoding strings to avoid typos!

## Testing

All models include factory functions (`create*`) that:
- Generate IDs automatically
- Set timestamps automatically
- Provide default values
- Validate required fields

This makes testing and development easier!
