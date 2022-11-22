import { useAssetStore } from '@/stores/AssetStore'
import { EntryTypeEnum } from '@/models/holdings/EntryTypeEnum'
import { SortColumn } from '@/models/enums/SortEnum'
import type { AssetRenderingEntry } from '@/models/holdings/AssetRenderingEntry'
import type { PublicHolding } from '@/models/holdings/PublicHolding'
import type { PrivateHolding } from '@/models/holdings/PrivateHolding'
import { getNewestPriceRecord } from '@/composables/UsePriceRecords'
import { calcCurrentValue } from '@/composables/assets/UseCurrentValues'
import { getTargetPercentage } from '@/composables/assets/UseTargetPercentage'
import { getRawDeviation } from '@/composables/assets/UseDeviation'
import type { HoldingGroup } from '@/models/holdings/HoldingGroup'
import {
  getTotalGroupDeviation,
  getTotalGroupValue,
} from '@/composables/UseTotalValues'

/**
 * Sort the asset list based on the column and isAsc parameters
 *
 * @param column SortColumn
 * @param isAsc boolean
 *
 * @return void
 */
export function sortAssetList(column: SortColumn, isAsc: boolean): void {
  const assetStore = useAssetStore()
  assetStore.renderState.assetList = new Map(
    [...assetStore.renderState.assetList].sort(
      (
        assetA: [string, AssetRenderingEntry],
        assetB: [string, AssetRenderingEntry]
      ): number => {
        switch (column) {
          case SortColumn.ASSET_NAME:
            return _compareName(assetStore, assetA[1], assetB[1], isAsc)
          case SortColumn.PRICE:
            return _comparePrice(assetStore, assetA[1], assetB[1], isAsc)
          case SortColumn.OWNED_QUANTITY:
            return _compareQuantity(assetStore, assetA[1], assetB[1], isAsc)
          case SortColumn.CURRENT_VALUE:
            return _compareCurrentValue(assetStore, assetA[1], assetB[1], isAsc)
          case SortColumn.TARGET_PERCENTAGE:
            return _compareTargetPercentage(
              assetStore,
              assetA[1],
              assetB[1],
              isAsc
            )
          case SortColumn.DEVIATION:
            return _compareDeviation(assetStore, assetA[1], assetB[1], isAsc)
        }

        return -1
      }
    )
  )
}

/**
 * Compare the name of two assets in order to sort them
 *
 * @param assetStore any
 * @param assetA AssetRenderingEntry
 * @param assetB AssetRenderingEntry
 * @param isAsc boolean
 *
 * @return number
 */
function _compareName(
  assetStore: any,
  assetA: AssetRenderingEntry,
  assetB: AssetRenderingEntry,
  isAsc: boolean
): number {
  const nameA: string = _getName(assetStore, assetA, isAsc)
  const nameB: string = _getName(assetStore, assetB, isAsc)
  return isAsc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA)
}

/**
 * Get the name of an asset rendering entry by its uuid and entry type
 *
 * @param assetStore any
 * @param asset AssetRenderingEntry
 * @param isAsc boolean
 *
 * @return string
 */
function _getName(
  assetStore: any,
  asset: AssetRenderingEntry,
  isAsc: boolean
): string {
  switch (asset.entryType) {
    case EntryTypeEnum.HOLDING_GROUP:
      // Compare inner group values
      const renderGroup = assetStore.renderState.assetList.get(
        asset.uuid
      ) as AssetRenderingEntry
      if (renderGroup) {
        renderGroup.groupEntries = renderGroup.groupEntries.sort((a, b) => {
          const assetA = {
            uuid: a.uuid,
            entryType: a.entryType,
          } as AssetRenderingEntry
          const assetB = {
            uuid: b.uuid,
            entryType: b.entryType,
          } as AssetRenderingEntry
          return _compareName(assetStore, assetA, assetB, isAsc)
        })
      }
      // Compare group itself
      const poolGroup = assetStore.getAssetPoolEntryByUuid(
        asset.uuid
      ) as HoldingGroup
      if (poolGroup) {
        return poolGroup.groupName
      }
      break
    case EntryTypeEnum.PUBLIC_HOLDING:
      const publicHolding = assetStore.getAssetPoolEntryByUuid(
        asset.uuid
      ) as PublicHolding
      if (publicHolding) {
        return publicHolding.publicAsset.assetName
      }
      break
    case EntryTypeEnum.PRIVATE_HOLDING:
      const privateHolding = assetStore.getAssetPoolEntryByUuid(
        asset.uuid
      ) as PrivateHolding
      if (privateHolding) {
        return privateHolding.title
      }
      break
  }
  return ''
}

/**
 * Compare the price of two assets in order to sort them
 *
 * @param assetStore any
 * @param assetA AssetRenderingEntry
 * @param assetB AssetRenderingEntry
 * @param isAsc boolean
 *
 * @return number
 */
function _comparePrice(
  assetStore: any,
  assetA: AssetRenderingEntry,
  assetB: AssetRenderingEntry,
  isAsc: boolean
): number {
  const priceA: number = _getPrice(assetStore, assetA, isAsc)
  const priceB: number = _getPrice(assetStore, assetB, isAsc)

  if (priceA < priceB) return isAsc ? -1 : 1
  if (priceA > priceB) return isAsc ? 1 : -1
  return 0
}

/**
 * Get the price of an asset rendering entry by its uuid and entry type
 *
 * @param assetStore any
 * @param asset AssetRenderingEntry
 * @param isAsc boolean
 *
 * @return number
 */
function _getPrice(
  assetStore: any,
  asset: AssetRenderingEntry,
  isAsc: boolean
): number {
  switch (asset.entryType) {
    case EntryTypeEnum.HOLDING_GROUP:
      // Compare inner group values
      const renderGroup = assetStore.renderState.assetList.get(
        asset.uuid
      ) as AssetRenderingEntry
      if (renderGroup) {
        renderGroup.groupEntries = renderGroup.groupEntries.sort((a, b) => {
          const assetA = {
            uuid: a.uuid,
            entryType: a.entryType,
          } as AssetRenderingEntry
          const assetB = {
            uuid: b.uuid,
            entryType: b.entryType,
          } as AssetRenderingEntry
          return _comparePrice(assetStore, assetA, assetB, isAsc)
        })
      }
      break
    case EntryTypeEnum.PUBLIC_HOLDING:
      const publicHolding = assetStore.getAssetPoolEntryByUuid(
        asset.uuid
      ) as PublicHolding
      if (publicHolding) {
        return getNewestPriceRecord(publicHolding.publicAsset.assetPriceRecords)
      }
      break
    case EntryTypeEnum.PRIVATE_HOLDING:
      const privateHolding = assetStore.getAssetPoolEntryByUuid(
        asset.uuid
      ) as PrivateHolding
      if (privateHolding) {
        return privateHolding.pricePerUnit
      }
      break
  }
  return 0
}

/**
 * Compare the owned quantity of two assets in order to sort them
 *
 * @param assetStore any
 * @param assetA AssetRenderingEntry
 * @param assetB AssetRenderingEntry
 * @param isAsc boolean
 *
 * @return number
 */
function _compareQuantity(
  assetStore: any,
  assetA: AssetRenderingEntry,
  assetB: AssetRenderingEntry,
  isAsc: boolean
): number {
  const quantityA: number = _getQuantity(assetStore, assetA, isAsc)
  const quantityB: number = _getQuantity(assetStore, assetB, isAsc)

  if (quantityA < quantityB) return isAsc ? -1 : 1
  if (quantityA > quantityB) return isAsc ? 1 : -1
  return 0
}

/**
 * Get the owned quantity of an asset rendering entry by its uuid and entry type
 *
 * @param assetStore any
 * @param asset AssetRenderingEntry
 * @param isAsc boolean
 *
 * @return number
 */
function _getQuantity(
  assetStore: any,
  asset: AssetRenderingEntry,
  isAsc: boolean
): number {
  switch (asset.entryType) {
    case EntryTypeEnum.HOLDING_GROUP:
      // Compare inner group values
      const renderGroup = assetStore.renderState.assetList.get(
        asset.uuid
      ) as AssetRenderingEntry
      if (renderGroup) {
        renderGroup.groupEntries = renderGroup.groupEntries.sort((a, b) => {
          const assetA = {
            uuid: a.uuid,
            entryType: a.entryType,
          } as AssetRenderingEntry
          const assetB = {
            uuid: b.uuid,
            entryType: b.entryType,
          } as AssetRenderingEntry
          return _compareQuantity(assetStore, assetA, assetB, isAsc)
        })
      }
      break
    case EntryTypeEnum.PUBLIC_HOLDING:
      const publicHolding = assetStore.getAssetPoolEntryByUuid(
        asset.uuid
      ) as PublicHolding
      if (publicHolding) {
        return publicHolding.ownedQuantity
      }
      break
    case EntryTypeEnum.PRIVATE_HOLDING:
      const privateHolding = assetStore.getAssetPoolEntryByUuid(
        asset.uuid
      ) as PrivateHolding
      if (privateHolding) {
        return privateHolding.ownedQuantity
      }
      break
  }
  return 0
}

/**
 * Compare the current value of two assets in order to sort them
 *
 * @param assetStore any
 * @param assetA AssetRenderingEntry
 * @param assetB AssetRenderingEntry
 * @param isAsc boolean
 *
 * @return number
 */
function _compareCurrentValue(
  assetStore: any,
  assetA: AssetRenderingEntry,
  assetB: AssetRenderingEntry,
  isAsc: boolean
): number {
  const valueA: number = _getCurrentValue(assetStore, assetA, isAsc)
  const valueB: number = _getCurrentValue(assetStore, assetB, isAsc)

  if (valueA < valueB) return isAsc ? -1 : 1
  if (valueA > valueB) return isAsc ? 1 : -1
  return 0
}

/**
 * Get the current value of an asset rendering entry by its uuid and entry type
 *
 * @param assetStore any
 * @param asset AssetRenderingEntry
 * @param isAsc boolean
 *
 * @return number
 */
function _getCurrentValue(
  assetStore: any,
  asset: AssetRenderingEntry,
  isAsc: boolean
): number {
  switch (asset.entryType) {
    case EntryTypeEnum.HOLDING_GROUP:
      // Compare inner group values
      const renderGroup = assetStore.renderState.assetList.get(
        asset.uuid
      ) as AssetRenderingEntry
      if (renderGroup) {
        renderGroup.groupEntries = renderGroup.groupEntries.sort((a, b) => {
          const assetA = {
            uuid: a.uuid,
            entryType: a.entryType,
          } as AssetRenderingEntry
          const assetB = {
            uuid: b.uuid,
            entryType: b.entryType,
          } as AssetRenderingEntry
          return _compareCurrentValue(assetStore, assetA, assetB, isAsc)
        })
      }
      const poolGroup = assetStore.getAssetPoolEntryByUuid(
        asset.uuid
      ) as HoldingGroup
      if (poolGroup) {
        return getTotalGroupValue(poolGroup.uuid)
      }
      break
    case EntryTypeEnum.PUBLIC_HOLDING:
      const publicHolding = assetStore.getAssetPoolEntryByUuid(asset.uuid)
      if (publicHolding) {
        return calcCurrentValue(publicHolding, EntryTypeEnum.PUBLIC_HOLDING)
      }
      break
    case EntryTypeEnum.PRIVATE_HOLDING:
      const privateHolding = assetStore.getAssetPoolEntryByUuid(asset.uuid)
      if (privateHolding) {
        return calcCurrentValue(privateHolding, EntryTypeEnum.PRIVATE_HOLDING)
      }
      break
  }
  return 0
}

/**
 * Compare the target percentage of two assets in order to sort them
 *
 * @param assetStore any
 * @param assetA AssetRenderingEntry
 * @param assetB AssetRenderingEntry
 * @param isAsc boolean
 *
 * @return number
 */
function _compareTargetPercentage(
  assetStore: any,
  assetA: AssetRenderingEntry,
  assetB: AssetRenderingEntry,
  isAsc: boolean
): number {
  const targetPercentageA: number = _getTargetPercentage(
    assetStore,
    assetA,
    isAsc
  )
  const targetPercentageB: number = _getTargetPercentage(
    assetStore,
    assetB,
    isAsc
  )

  if (targetPercentageA < targetPercentageB) return isAsc ? -1 : 1
  if (targetPercentageA > targetPercentageB) return isAsc ? 1 : -1
  return 0
}

/**
 * Get the target percentage of an asset rendering entry by its uuid and entry type
 *
 * @param assetStore any
 * @param asset AssetRenderingEntry
 * @param isAsc boolean
 *
 * @return number
 */
function _getTargetPercentage(
  assetStore: any,
  asset: AssetRenderingEntry,
  isAsc: boolean
): number {
  switch (asset.entryType) {
    case EntryTypeEnum.HOLDING_GROUP:
      // Compare inner group values
      const renderGroup = assetStore.renderState.assetList.get(
        asset.uuid
      ) as AssetRenderingEntry
      if (renderGroup) {
        renderGroup.groupEntries = renderGroup.groupEntries.sort((a, b) => {
          const assetA = {
            uuid: a.uuid,
            entryType: a.entryType,
          } as AssetRenderingEntry
          const assetB = {
            uuid: b.uuid,
            entryType: b.entryType,
          } as AssetRenderingEntry
          return _compareTargetPercentage(assetStore, assetA, assetB, isAsc)
        })
      }
      // Compare group itself
      const poolGroup = assetStore.getAssetPoolEntryByUuid(
        asset.uuid
      ) as HoldingGroup
      if (poolGroup) {
        return poolGroup.targetPercentage
      }
      break
    case EntryTypeEnum.PUBLIC_HOLDING:
      const publicHolding = assetStore.getAssetPoolEntryByUuid(asset.uuid)
      if (publicHolding) {
        return getTargetPercentage(publicHolding, EntryTypeEnum.PUBLIC_HOLDING)
      }
      break
    case EntryTypeEnum.PRIVATE_HOLDING:
      const privateHolding = assetStore.getAssetPoolEntryByUuid(asset.uuid)
      if (privateHolding) {
        return getTargetPercentage(
          privateHolding,
          EntryTypeEnum.PRIVATE_HOLDING
        )
      }
      break
  }
  return 0
}

/**
 * Compare the deviation of two assets in order to sort them
 *
 * @param assetStore any
 * @param assetA AssetRenderingEntry
 * @param assetB AssetRenderingEntry
 * @param isAsc boolean
 *
 * @return number
 */
function _compareDeviation(
  assetStore: any,
  assetA: AssetRenderingEntry,
  assetB: AssetRenderingEntry,
  isAsc: boolean
): number {
  const deviationA: number = _getDeviation(assetStore, assetA, isAsc)
  const deviationB: number = _getDeviation(assetStore, assetB, isAsc)

  if (deviationA < deviationB) return isAsc ? -1 : 1
  if (deviationA > deviationB) return isAsc ? 1 : -1
  return 0
}

/**
 * Get the deviation of an asset rendering entry by its uuid and entry type
 *
 * @param assetStore any
 * @param asset AssetRenderingEntry
 * @param isAsc boolean
 *
 * @return number
 */
function _getDeviation(
  assetStore: any,
  asset: AssetRenderingEntry,
  isAsc: boolean
): number {
  switch (asset.entryType) {
    case EntryTypeEnum.HOLDING_GROUP:
      // Compare inner group values
      const renderGroup = assetStore.renderState.assetList.get(
        asset.uuid
      ) as AssetRenderingEntry
      if (renderGroup) {
        renderGroup.groupEntries = renderGroup.groupEntries.sort((a, b) => {
          const assetA = {
            uuid: a.uuid,
            entryType: a.entryType,
          } as AssetRenderingEntry
          const assetB = {
            uuid: b.uuid,
            entryType: b.entryType,
          } as AssetRenderingEntry
          return _compareDeviation(assetStore, assetA, assetB, isAsc)
        })
      }
      // Compare group itself
      const poolGroup = assetStore.getAssetPoolEntryByUuid(
        asset.uuid
      ) as HoldingGroup
      if (poolGroup) {
        return getTotalGroupDeviation(poolGroup.uuid)
      }
      break
    case EntryTypeEnum.PUBLIC_HOLDING:
      const publicHolding = assetStore.getAssetPoolEntryByUuid(asset.uuid)
      if (publicHolding) {
        return getRawDeviation(publicHolding, EntryTypeEnum.PUBLIC_HOLDING)
      }
      break
    case EntryTypeEnum.PRIVATE_HOLDING:
      const privateHolding = assetStore.getAssetPoolEntryByUuid(asset.uuid)
      if (privateHolding) {
        return getRawDeviation(privateHolding, EntryTypeEnum.PRIVATE_HOLDING)
      }
      break
  }
  return 0
}
