import type { UnitTypeEnum } from '@/models/enums/UnitTypeEnum'
import { i18n } from '@/i18n'

export function createUnitTypeObject(unitTypeArray: UnitTypeEnum[]) {
  const tempArray: any = []
  for (const unitTypeKey of unitTypeArray) {
    if (unitTypeKey == 'UNKNOWN') continue
    tempArray.push({
      value: unitTypeKey,
      text: getUnitTypeValue(unitTypeKey),
    })
  }
  return tempArray
}

/**
 * Get a unit type option value translated by its key
 *
 * @param unitTypeKey UnitTypeEnum
 */
export function getUnitTypeValue(unitTypeKey: UnitTypeEnum): string {
  const { t } = i18n.global
  return t(`assetList.listEntries.privateHolding.unitTypes.${unitTypeKey}`)
}
