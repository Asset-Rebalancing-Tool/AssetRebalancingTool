import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import type { PublicAsset } from '@/models/PublicAsset'
import type { AssetListEntry } from '@/models/holdings/AssetListEntry'
import type { BaseEntity } from '@/models/holdings/BaseEntity'
import type { PublicHolding } from '@/models/holdings/PublicHolding'
import type { PrivateHolding } from '@/models/holdings/PrivateHolding'
import type { HoldingGroup } from '@/models/holdings/HoldingGroup'
import { AssetListEntryTypeEnum } from '@/models/enums/AssetListEntryTypeEnum'
import { getNewestPriceRecord } from '@/composables/UsePriceRecords'
import {InputStatusEnum} from "@/models/enums/InputStatusEnum";

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
    selectedListEntries: AssetListEntry[]
    selectedGroupEntries: AssetListEntry[]
    editGroupEntries: boolean
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
    inputStatusIcon: InputStatusEnum.NONE
  })

  // All reactive selection properties
  const selectionState: SelectionState = reactive({
    selectedListEntries: [],
    selectedGroupEntries: [],
    editGroupEntries: false,
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
          case AssetListEntryTypeEnum.PUBLIC_HOLDING:
            listState.assetListEntries[key].publicHolding =
              patchedEntry as PublicHolding
            break
          case AssetListEntryTypeEnum.PRIVATE_HOLDING:
            listState.assetListEntries[key].privateHolding =
              patchedEntry as PrivateHolding
            break
          case AssetListEntryTypeEnum.HOLDING_GROUP:
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
   */
  function updateTotalValue(): void {
    let totalValue = 0
    listState.assetListEntries.forEach((value, key) => {
      switch (value.entryType) {
        case AssetListEntryTypeEnum.PUBLIC_HOLDING:
          totalValue =
            totalValue +
            value.publicHolding!.ownedQuantity *
              getNewestPriceRecord(
                value.publicHolding!.publicAsset.assetPriceRecords
              )
          break
        case AssetListEntryTypeEnum.PRIVATE_HOLDING:
          totalValue =
            totalValue +
            value.privateHolding!.ownedQuantity *
              value.privateHolding!.pricePerUnit
          break
        case AssetListEntryTypeEnum.HOLDING_GROUP:
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
   */
  function updateTotalTargetPercentage(): void {
    let totalTargetPercentage = 0
    listState.assetListEntries.forEach((value, key) => {
      switch (value.entryType) {
        case AssetListEntryTypeEnum.PUBLIC_HOLDING:
          totalTargetPercentage =
            totalTargetPercentage + value.publicHolding!.targetPercentage
          break
        case AssetListEntryTypeEnum.PRIVATE_HOLDING:
          totalTargetPercentage =
            totalTargetPercentage + value.privateHolding!.targetPercentage
          break
        case AssetListEntryTypeEnum.HOLDING_GROUP:
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
  /**------------- Return All State Variables And Actions ---------------**/
  /**-******************************************************************-**/

  return {
    // State variables
    showSidebar,
    searchbarState,
    listState,
    selectionState,

    // Actions
    getSearchbarAsset,
    replaceListEntry,
    updateTotalValue,
    updateTotalTargetPercentage,
  }
})
