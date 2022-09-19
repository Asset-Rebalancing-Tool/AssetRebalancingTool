import { defineStore } from 'pinia'
import type { PublicAsset } from '@/models/PublicAsset'
import { CurrencyEnum } from '@/models/enums/CurrencyEnum'
import type { AssetListEntry } from '@/models/holdings/AssetListEntry'
import type { PublicHolding } from '@/models/holdings/PublicHolding'
import type { PrivateHolding } from '@/models/holdings/PrivateHolding'
import type { HoldingGroup } from '@/models/holdings/HoldingGroup'
import type { BaseEntity } from '@/models/holdings/BaseEntity'
import { AssetListEntryTypeEnum } from '@/models/enums/AssetListEntryTypeEnum'
import {
  getNewestPriceRecord,
  getNewestPriceRecordFormatted,
} from '@/composables/UsePriceRecords'

/***********************************************************************************/
/* --------------------------------- Asset Store ----------------------------------*/
/***********************************************************************************/

export type RootState = {
  showSidebar: boolean
  searchString: string
  searchbarAssets: PublicAsset[]
  searchbarResultCount: number
  searchbarLoadingFlag: boolean
  assetListEntries: AssetListEntry[]
  totalAssetListValue: number
  totalAssetListPercentage: number
  totalAssetListDeviation: number
  activeModalUnderlay: boolean
}

export const useAssetStore = defineStore('assetStore', {
  state: () =>
    ({
      showSidebar: localStorage.getItem('token') !== null,
      /** Reactive asset searchbar */
      searchString: '',
      searchbarAssets: [],
      searchbarResultCount: 0,
      searchbarLoadingFlag: true,
      /** Reactive list object */
      assetListEntries: [],
      totalAssetListValue: 0,
      totalAssetListPercentage: 0,
      totalAssetListDeviation: 0,
      activeModalUnderlay: false,
    } as RootState),

  actions: {
    /**
     * Update an entry of the genericHoldingRows
     *
     * @param patchedEntry PublicHolding
     */
    updateAssetListEntry(patchedEntry: BaseEntity) {
      this.assetListEntries.forEach((value, key) => {
        if (value.uuid == patchedEntry.uuid) {
          switch (value.entryType) {
            case AssetListEntryTypeEnum.PUBLIC_HOLDING:
              this.assetListEntries[key].publicHolding =
                patchedEntry as PublicHolding
              break
            case AssetListEntryTypeEnum.PRIVATE_HOLDING:
              this.assetListEntries[key].privateHolding =
                patchedEntry as PrivateHolding
              break
            case AssetListEntryTypeEnum.HOLDING_GROUP:
              this.assetListEntries[key].holdingGroup =
                patchedEntry as HoldingGroup
              break
          }
        }
      })
      this.updateTotalValue()
      this.updateTotalTargetPercentage()
    },

    updateTotalValue() {
      let totalValue = 0
      this.assetListEntries.forEach((value, key) => {
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
            this.assetListEntries[key].holdingGroup!.publicHoldings.forEach(
              (value) => {
                totalValue =
                  totalValue +
                  value.ownedQuantity *
                    getNewestPriceRecord(value.publicAsset.assetPriceRecords)
              }
            )
            this.assetListEntries[key].holdingGroup!.privateHoldings.forEach(
              (value) => {
                totalValue =
                  totalValue + value.ownedQuantity * value.pricePerUnit
              }
            )
            break
        }
      })
      this.totalAssetListValue = totalValue
    },

    updateTotalTargetPercentage() {
      let totalTargetPercentage = 0
      this.assetListEntries.forEach((value, key) => {
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
            this.assetListEntries[key].holdingGroup!.publicHoldings.forEach(
              (value) => {
                totalTargetPercentage =
                  totalTargetPercentage + value.targetPercentage
              }
            )
            this.assetListEntries[key].holdingGroup!.privateHoldings.forEach(
              (value) => {
                totalTargetPercentage =
                  totalTargetPercentage + value.targetPercentage
              }
            )
            break
        }
      })
      this.totalAssetListPercentage = totalTargetPercentage
    },

    /**
     * Iterate over the searchbar assets and check if the uuid matches the passed uuid
     *
     * @param uuid
     */
    getSearchbarAsset(uuid: string): PublicAsset {
      // Ensure that the searchbar assets array is not empty
      if (this.searchbarAssets.length === 0) {
        return {} as PublicAsset
      }
      // Loop over the searchbar assets and check if the uuid matches the passed uuid
      for (const asset of this.searchbarAssets) {
        if (asset.uuid === uuid) return asset
      }
      // If there is no asset with the passed uuid, return an empty object
      return {} as PublicAsset
    }
  },
})
