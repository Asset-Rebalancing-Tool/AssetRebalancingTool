import { UnitTypeEnum } from '@/models/enums/UnitTypeEnum'
import type { UnitTypeEnum as UnitType } from '@/models/enums/UnitTypeEnum'

/**
 * Map an array of unit types
 *
 * @param unitTypeArray UnitTypeEnum[]
 */
export function mapUnitTypeArray(unitTypeArray: UnitType[]) {
  const tempArray = []
  for (const unitType of unitTypeArray) {
    if (unitType === UnitTypeEnum.UNKNOWN) continue
    tempArray.push(mapUnitType(unitType))
  }
  return tempArray
}

/**
 * Map the asset type to its german value
 *
 * @param unitType UnitTypeEnum
 */
export function mapUnitType(unitType: UnitType): string {
  switch (unitType) {
    default:
    case 'Grams':
      return 'Gramm'
    case 'Kilos':
      return 'Kilo'
    case 'Liters':
      return 'Liter'
    case 'Milliliters':
      return 'Milliliter'
    case 'Ounce':
      return 'Unze'
    case 'Piece':
      return 'Stück'
    case 'Unknown':
      return '?'
  }
}
