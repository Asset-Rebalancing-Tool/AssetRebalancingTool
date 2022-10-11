import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import type { Ref } from 'vue'
import { SortColumn } from '@/models/enums/SortEnum'
import type { AssetMapEntry } from '@/models/AssetMapEntry'
import type {
  SortColumn as ColumnType,
  SortDirection as DirectionType,
} from '@/models/enums/SortEnum'
import type { AssetList } from '@/models/holdings/AssetList'
import { EntryTypeEnum } from '@/models/enums/EntryTypeEnum'
import type { PublicHolding } from '@/models/holdings/PublicHolding'
import type { PrivateHolding } from '@/models/holdings/PrivateHolding'
import type { HoldingGroup } from '@/models/holdings/HoldingGroup'
import { getNewestPriceRecord } from '@/composables/UsePriceRecords'

export const useAssetMapStore = defineStore('assetMapStore', () => {
  let assetMap: Map<string, AssetMapEntry> = reactive(
    new Map<string, AssetMapEntry>()
  )
  const assetList = reactive(new Map<string, AssetList>())

  const listLoadingFlag: Ref<boolean> = ref(true)

  const totalAssetListValue: Ref<number> = ref(0)
  const totalAssetListPercentage: Ref<number> = ref(0)
  const totalAssetListTargetPercentage: Ref<number> = ref(0)
  const totalAssetListDeviation: Ref<number> = ref(0)

  const editGroupEntries: Ref<boolean> = ref(false)
  const selectedGroup: Ref<HoldingGroup | null> = ref(null)

  /**-******************************************************************-**/
  /**-------------------- Render Asset List Actions ---------------------**/
  /**-******************************************************************-**/

  /**
   * Try to get an entry of the asset map by its uuid.
   * If the uuid does not exit or the map entry can't be accessed null will be returned
   *
   * @param uuid
   *
   * @return AssetMapEntry | null
   */
  function getAssetMapEntryByUuid(uuid: string): AssetMapEntry | null {
    // Ensure that the uuid exist in the asset map
    if (!assetMap.has(uuid)) {
      console.log('the uuid ' + uuid + ' was not found in the asset map')
      return null
    }

    const mapEntry: AssetMapEntry | undefined = assetMap.get(uuid)
    return mapEntry ? mapEntry : null
  }

  /**
   * Add a new entry to the asset map
   *
   * Ensure that the uuid of the new entry does not already exist in the map.
   * If so patch the entry with this uuid instead of adding it.
   *
   * @param uuid string
   * @param mapEntry AssetMapEntry
   *
   * @return void
   */
  function addAssetMapEntry(uuid: string, mapEntry: AssetMapEntry): void {
    if (!assetMap.has(uuid)) {
      assetMap.set(uuid, mapEntry)
    } else {
      console.log(
        'uuid already exists in asset map. Fired patch action instead of add action'
      )
      patchAssetMapEntry(uuid, mapEntry)
    }
  }

  /**
   * Patch an existing asset map entry
   *
   * Ensure that the uuid of the new entry already exist in the map.
   * If not add the entry to the asset map instead if patching it.
   *
   * @param uuid string
   * @param patchedMapEntry AssetMapEntry
   *
   * @return void
   */
  function patchAssetMapEntry(
    uuid: string,
    patchedMapEntry: AssetMapEntry
  ): void {
    if (assetMap.has(uuid)) {
      assetMap.set(uuid, patchedMapEntry)
    } else {
      console.log(
        'uuid already exists in asset map. Fired add action instead of patch action'
      )
      addAssetMapEntry(uuid, patchedMapEntry)
    }
  }

  /**
   * remove an existing asset map entry by its uuid
   *
   * @param uuid string
   *
   * @return void
   */
  function removeAssetMapEntry(uuid: string): void {
    if (assetMap.has(uuid)) {
      assetMap.delete(uuid)
    }
  }

  /**
   * Set the initial total asset list value by iterating over the fetched asset map holdings
   */
  function setAssetListTotalValue() {
    let totalValue = 0
    assetMap.forEach((mapEntry: AssetMapEntry) => {
      let ownedQuantity = 0
      let currentPrice = 0
      switch (mapEntry.entryType) {
        case EntryTypeEnum.PUBLIC_HOLDING:
          const publicHolding = mapEntry as PublicHolding
          ownedQuantity = publicHolding.ownedQuantity
          currentPrice = getNewestPriceRecord(
            publicHolding.publicAsset.assetPriceRecords
          )
          break
        case EntryTypeEnum.PRIVATE_HOLDING:
          const privateHolding = mapEntry as PrivateHolding
          ownedQuantity = privateHolding.ownedQuantity
          currentPrice = privateHolding.pricePerUnit
          break
      }
      totalValue += ownedQuantity * currentPrice
    })
    totalAssetListValue.value = totalValue
  }

  /**
   * Set the initial total asset list target percentage by iterating over the fetched asset map holdings
   * NOTE: Holding groups are not needed in this incrementation, since the asset map contains all assets
   */
  function setAssetListTotalTargetPercentage() {
    let totalTargetPercentage = 0
    assetMap.forEach((mapEntry: AssetMapEntry) => {
      switch (mapEntry.entryType) {
        case EntryTypeEnum.PUBLIC_HOLDING:
          const publicHolding = mapEntry as PublicHolding
          totalTargetPercentage += publicHolding.targetPercentage
          break
        case EntryTypeEnum.PRIVATE_HOLDING:
          const privateHolding = mapEntry as PrivateHolding
          totalTargetPercentage += privateHolding.targetPercentage
          break
      }
    })
    totalAssetListTargetPercentage.value = totalTargetPercentage
  }

  /**
   * Set the initial total asset list target percentage by iterating over the fetched asset map holdings
   * NOTE: Holding groups are not needed in this incrementation, since the asset map contains all assets
   */
  function setAssetListTotalDeviation() {
    let totalDeviation = 0
    assetMap.forEach((mapEntry: AssetMapEntry) => {
      switch (mapEntry.entryType) {
        case EntryTypeEnum.PUBLIC_HOLDING:
          const publicHolding = mapEntry as PublicHolding
          const targetPercentage = publicHolding.targetPercentage
          const priceRecord: number = getNewestPriceRecord(
            publicHolding.publicAsset.assetPriceRecords
          )
          const currentValue: number = publicHolding.ownedQuantity * priceRecord
          const currentPercentage =
            (currentValue / totalAssetListValue.value) * 100
          totalDeviation += Math.abs(currentPercentage - targetPercentage)
          break

        case EntryTypeEnum.PRIVATE_HOLDING:
          const privateHolding = mapEntry as PrivateHolding
          totalDeviation += privateHolding.targetPercentage
          break
      }
    })
    totalAssetListDeviation.value = totalDeviation
  }

  /**-******************************************************************-**/
  /**---------------------- Sort Asset Map Actions ----------------------**/
  /**-******************************************************************-**/

  function sortMapEntries(
    sortColumn: ColumnType,
    sortDirection: DirectionType
  ): void {
    assetMap = new Map(
      [...assetMap].sort(
        (a: [string, AssetMapEntry], b: [string, AssetMapEntry]) => {
          switch (sortColumn) {
            case SortColumn.ENTRY_NAME:
              return _sortAlphabetical(a, b, sortColumn)
            case SortColumn.PRICE:
            case SortColumn.OWNED_QUANTITY:
            case SortColumn.CURRENT_VALUE:
            case SortColumn.TARGET_PERCENTAGE:
            case SortColumn.DEVIATION:
              return _sortNumeric(a, b, sortColumn)
          }
        }
      )
    )
  }

  function _sortAlphabetical(
    a: [string, AssetMapEntry],
    b: [string, AssetMapEntry],
    sortColumn: ColumnType
  ): number {
    return -1
  }

  function _sortNumeric(
    a: [string, AssetMapEntry],
    b: [string, AssetMapEntry],
    sortColumn: ColumnType
  ): number {
    return -1
  }

  return {
    assetMap,
    assetList,
    listLoadingFlag,

    totalAssetListValue,
    totalAssetListPercentage,
    totalAssetListTargetPercentage,
    totalAssetListDeviation,
    editGroupEntries,
    selectedGroup,

    // Actions
    getAssetMapEntryByUuid,
    addAssetMapEntry,
    patchAssetMapEntry,
    removeAssetMapEntry,
    setAssetListTotalValue,
    setAssetListTotalTargetPercentage,
    setAssetListTotalDeviation,
  }
})
