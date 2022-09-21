import type { Ref } from 'vue'
import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { getNewestPriceRecord } from '@/composables/UsePriceRecords'
import type { PublicAsset } from '@/models/PublicAsset'
import type { AssetListEntry } from '@/models/holdings/AssetListEntry'
import type { BaseEntity } from '@/models/holdings/BaseEntity'
import type { PublicHolding } from '@/models/holdings/PublicHolding'
import type { PrivateHolding } from '@/models/holdings/PrivateHolding'
import type { HoldingGroup } from '@/models/holdings/HoldingGroup'
import { EntryTypeEnum } from '@/models/enums/EntryTypeEnum'
import { InputStatusEnum } from '@/models/enums/InputStatusEnum'

export const useAssetStore = defineStore('assetStore', () => {
  /**-******************************************************************-**/
  /**-------------------- Asset List State Interfaces -------------------**/
  /**-******************************************************************-**/

  interface SearchbarState {
    searchString: string
    searchbarAssets: PublicAsset[]
    searchbarResultCount: number
    searchbarLoadingFlag: boolean
    activeModalUnderlay: boolean
  }

  interface ListState {
    assetListEntries: AssetListEntry[]
    totalAssetListValue: number
    totalAssetListPercentage: number
    totalAssetListDeviation: number
    inputStatusIcon: InputStatusEnum
  }

  interface SelectionState {
    editGroupEntries: boolean
    groupUuid: string | null
  }

  /**-******************************************************************-**/
  /**-------------------- Asset List State Variables --------------------**/
  /**-******************************************************************-**/

  // bool that indicates if the sidebar should be rendered
  const showSidebar: Ref<boolean> = ref(localStorage.getItem('token') !== null)

  // All reactive searchbar variables
  const searchbarState: SearchbarState = reactive({
    searchString: '',
    searchbarAssets: [],
    searchbarResultCount: 0,
    searchbarLoadingFlag: false,
    activeModalUnderlay: false,
  })

  // All reactive list variables
  const listState: ListState = reactive({
    assetListEntries: [],
    totalAssetListValue: 0,
    totalAssetListPercentage: 0,
    totalAssetListDeviation: 0,
    inputStatusIcon: InputStatusEnum.NONE,
  })

  // All reactive selection properties
  const selectionState: SelectionState = reactive({
    editGroupEntries: false,
    groupUuid: null,
  })

  /**-******************************************************************-**/
  /**------------------------ Asset List Actions ------------------------**/
  /**-******************************************************************-**/

  /**
   * Iterate over the searchbar assets and check if the uuid matches the passed uuid
   *
   * @param uuid string
   *
   * @return PublicAsset
   */
  function getSearchbarAsset(uuid: string): PublicAsset {
    // Ensure that the searchbar assets array is not empty
    if (searchbarState.searchbarAssets.length === 0) {
      return {} as PublicAsset
    }
    // Loop over the searchbar assets and check if the uuid matches the passed uuid
    for (const asset of searchbarState.searchbarAssets) {
      if (asset.uuid === uuid) return asset
    }
    // If there is no asset with the passed uuid, return an empty object
    return {} as PublicAsset
  }

  /**
   * Replace an entry of the asset list entries array based on its uuid
   * This method is mainly called in patch process
   *
   * @param patchedEntry BaseEntity
   *
   * @return void
   */
  function replaceListEntry(patchedEntry: BaseEntity): void {
    // Iterate over each list entry
    listState.assetListEntries.forEach((value, key) => {
      // Check if the uuid of the entry matches the uuid of the patched entry
      if (value.uuid == patchedEntry.uuid) {
        // Replace the right list entry property entry with the patched entry based on the AssetListEntryTypeEnum
        switch (value.entryType) {
          case EntryTypeEnum.PUBLIC_HOLDING:
            listState.assetListEntries[key].publicHolding =
              patchedEntry as PublicHolding
            break
          case EntryTypeEnum.PRIVATE_HOLDING:
            listState.assetListEntries[key].privateHolding =
              patchedEntry as PrivateHolding
            break
          case EntryTypeEnum.HOLDING_GROUP:
            listState.assetListEntries[key].holdingGroup =
              patchedEntry as HoldingGroup
            break
        }
      }
    })

    updateTotalValue()
    updateTotalTargetPercentage()
  }

  /**
   * Update the total list value
   *
   * @return void
   */
  function updateTotalValue(): void {
    let totalValue = 0
    listState.assetListEntries.forEach((value, key) => {
      switch (value.entryType) {
        case EntryTypeEnum.PUBLIC_HOLDING:
          totalValue =
            totalValue +
            value.publicHolding!.ownedQuantity *
              getNewestPriceRecord(
                value.publicHolding!.publicAsset.assetPriceRecords
              )
          break
        case EntryTypeEnum.PRIVATE_HOLDING:
          totalValue =
            totalValue +
            value.privateHolding!.ownedQuantity *
              value.privateHolding!.pricePerUnit
          break
        case EntryTypeEnum.HOLDING_GROUP:
          listState.assetListEntries[key].holdingGroup!.publicHoldings.forEach(
            (value) => {
              totalValue =
                totalValue +
                value.ownedQuantity *
                  getNewestPriceRecord(value.publicAsset.assetPriceRecords)
            }
          )
          listState.assetListEntries[key].holdingGroup!.privateHoldings.forEach(
            (value) => {
              totalValue = totalValue + value.ownedQuantity * value.pricePerUnit
            }
          )
          break
      }
    })
    listState.totalAssetListValue = totalValue
  }

  /**
   * Update the total list target percentage
   *
   * @return void
   */
  function updateTotalTargetPercentage(): void {
    let totalTargetPercentage = 0
    listState.assetListEntries.forEach((value, key) => {
      switch (value.entryType) {
        case EntryTypeEnum.PUBLIC_HOLDING:
          totalTargetPercentage =
            totalTargetPercentage + value.publicHolding!.targetPercentage
          break
        case EntryTypeEnum.PRIVATE_HOLDING:
          totalTargetPercentage =
            totalTargetPercentage + value.privateHolding!.targetPercentage
          break
        case EntryTypeEnum.HOLDING_GROUP:
          listState.assetListEntries[key].holdingGroup!.publicHoldings.forEach(
            (value) => {
              totalTargetPercentage =
                totalTargetPercentage + value.targetPercentage
            }
          )
          listState.assetListEntries[key].holdingGroup!.privateHoldings.forEach(
            (value) => {
              totalTargetPercentage =
                totalTargetPercentage + value.targetPercentage
            }
          )
          break
      }
    })
    listState.totalAssetListPercentage = totalTargetPercentage
  }

  /**-******************************************************************-**/
  /**--------------- Add And Remove Holdings From Group -----------------**/
  /**-******************************************************************-**/

  /**
   * Get the index of the list state's assetListEntry array, by
   *
   * @param uuid string
   *
   * @return number
   */
  function getListEntryIndexByUuid(uuid: string): number {
    const listEntries = listState.assetListEntries

    // Iterate over each list entry from the store's list state
    for (let i = 0; i < listEntries.length; i++) {
      const listEntry = listEntries[i]

      // Check the list entry's type and compare the uuid's
      switch (listEntry.entryType) {
        default:
          return -1
        case EntryTypeEnum.HOLDING_GROUP:
          if (listEntry.holdingGroup?.uuid === uuid) return i
          break
        case EntryTypeEnum.PUBLIC_HOLDING:
          if (listEntry.publicHolding?.uuid === uuid) return i
          break
        case EntryTypeEnum.PRIVATE_HOLDING:
          if (listEntry.privateHolding?.uuid === uuid) return i
          break
      }
    }
    return -1
  }

  /**
   * Add a public or private list entry holding to a holding group
   *
   * @param listEntry AssetListEntry
   * @param groupUuid string
   *
   * @return void
   */
  function addListEntryToGroup(
    listEntry: AssetListEntry,
    groupUuid: string
  ): void {
    const groupIndex: number = getListEntryIndexByUuid(groupUuid)

    if (groupIndex === -1) {
      console.log('The selected group uuid was not found in the list entries')
      return
    }

    // Push the list entries holding based on the entry type
    switch (listEntry.entryType) {
      case EntryTypeEnum.PUBLIC_HOLDING:
        if (listEntry.publicHolding) {
          // Push the public holding that has been passed a parameter to the selected holding group
          listState.assetListEntries[
            groupIndex
          ].holdingGroup!.publicHoldings.push(listEntry.publicHolding)
          // Remove the whole list entry of the pushed holding by its index
          const holdingIndex = getListEntryIndexByUuid(
            listEntry.publicHolding.uuid
          )
          listState.assetListEntries.splice(holdingIndex, 1)
        }
        break
      case EntryTypeEnum.PRIVATE_HOLDING:
        if (listEntry.privateHolding) {
          // Push the private holding that has been passed a parameter to the selected holding group
          listState.assetListEntries[
            groupIndex
          ].holdingGroup!.privateHoldings.push(listEntry.privateHolding)
          // Remove the whole list entry of the pushed holding by its index
          const holdingIndex = getListEntryIndexByUuid(
            listEntry.privateHolding.uuid
          )
          listState.assetListEntries.splice(holdingIndex, 1)
        }
        break
    }
  }

  /**
   * Remove a public or private list entry holding from a holding group
   *
   * @param listEntry AssetListEntry
   * @param groupUuid string
   */
  function removeHoldingFromGroup(
    listEntry: AssetListEntry,
    groupUuid: string
  ): void {
    const groupIndex: number = getListEntryIndexByUuid(groupUuid)

    // Push the list entries holding based on the entry type
    switch (listEntry.entryType) {
      case EntryTypeEnum.PUBLIC_HOLDING:
        const publicUuid: string = listEntry.publicHolding!.uuid
        const publicIndex: number = getListEntryIndexByUuid(publicUuid)
        listState.assetListEntries[
          groupIndex
        ].holdingGroup?.publicHoldings.splice(publicIndex, 1)

        break
      case EntryTypeEnum.PRIVATE_HOLDING:
        const privateUuid = listEntry.privateHolding!.uuid
        const privateIndex: number = getListEntryIndexByUuid(privateUuid)
        listState.assetListEntries[
          groupIndex
        ].holdingGroup?.privateHoldings.splice(privateIndex, 1)
        break
    }
  }

  /**
   * Merge the public and private holdings of a holding group in order to iterate over one list
   * This is needed to render the holdings in a specific order
   *
   * @param groupUuid string
   */
  function mergePublicAndPrivateHoldings(groupUuid: string): AssetListEntry[] {
    const mergedListEntries: AssetListEntry[] = []
    const groupIndex: number = getListEntryIndexByUuid(groupUuid)

    const publicHoldings: PublicHolding[] | undefined =
      listState.assetListEntries[groupIndex].holdingGroup?.publicHoldings
    if (publicHoldings) {
      publicHoldings.forEach((entry) =>
        mergedListEntries.push({
          uuid: entry.uuid,
          entryType: EntryTypeEnum.PUBLIC_HOLDING,
          publicHolding: entry,
        } as AssetListEntry)
      )
    }

    const privateHoldings: PrivateHolding[] | undefined =
      listState.assetListEntries[groupIndex].holdingGroup?.privateHoldings
    if (privateHoldings) {
      privateHoldings.forEach((entry) =>
        mergedListEntries.push({
          uuid: entry.uuid,
          entryType: EntryTypeEnum.PRIVATE_HOLDING,
          privateHolding: entry,
        } as AssetListEntry)
      )
    }

    return mergedListEntries
  }

  /**-******************************************************************-**/
  /**------------- Return All State Variables And Actions ---------------**/
  /**-******************************************************************-**/

  return {
    // State variables
    showSidebar,
    searchbarState,
    listState,
    selectionState,

    // Actions
    addListEntryToGroup,
    removeHoldingFromGroup,
    mergePublicAndPrivateHoldings,

    getSearchbarAsset,
    replaceListEntry,
    updateTotalValue,
    updateTotalTargetPercentage,
  }
})
