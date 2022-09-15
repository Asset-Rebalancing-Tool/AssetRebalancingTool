import {defineStore} from 'pinia'
import type {PublicAsset} from '@/models/PublicAsset'
import {CurrencyEnum} from '@/models/enums/CurrencyEnum'
import type {AssetListEntry} from '@/models/holdings/AssetListEntry'
import type {PublicHolding} from '@/models/holdings/PublicHolding'
import type {PrivateHolding} from "@/models/holdings/PrivateHolding";
import type {HoldingGroup} from "@/models/holdings/HoldingGroup";
import type {BaseEntity} from "@/models/holdings/BaseEntity";
import {AssetListEntryTypeEnum} from "@/models/enums/AssetListEntryTypeEnum";
import {getNewestPriceRecord, getNewestPriceRecordFormatted} from "@/composables/valueArray";

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
      searchbarLoadingFlag: false,
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
                        this.assetListEntries[key].publicHolding = patchedEntry as PublicHolding
                        break;
                    case AssetListEntryTypeEnum.PRIVATE_HOLDING:
                        this.assetListEntries[key].privateHolding = patchedEntry as PrivateHolding
                        break;
                    case AssetListEntryTypeEnum.HOLDING_GROUP:
                        this.assetListEntries[key].holdingGroup = patchedEntry as HoldingGroup
                        break;
                }
            }
        })
        this.updateTotalValue()
        this.updateTotalTargetPercentage()
    },

      updateTotalValue() {
        let totalValue: number = 0
        this.assetListEntries.forEach((value, key) => {
            switch (value.entryType) {
                case AssetListEntryTypeEnum.PUBLIC_HOLDING:
                    totalValue = totalValue + (value.publicHolding!.ownedQuantity * getNewestPriceRecord(value.publicHolding!.publicAsset.assetPriceRecords))
                    break;
                case AssetListEntryTypeEnum.PRIVATE_HOLDING:
                    totalValue = totalValue + (value.privateHolding!.ownedQuantity * value.privateHolding!.pricePerUnit)
                    break;
                case AssetListEntryTypeEnum.HOLDING_GROUP:
                    this.assetListEntries[key].holdingGroup!.publicHoldings.forEach((value) => {
                        totalValue = totalValue + (value.ownedQuantity * getNewestPriceRecord(value.publicAsset.assetPriceRecords))
                    })
                    this.assetListEntries[key].holdingGroup!.privateHoldings.forEach((value) => {
                        totalValue = totalValue + value.ownedQuantity *  value.pricePerUnit
                    })
                    break;
            }
        })
        this.totalAssetListValue = totalValue
    },

    updateTotalTargetPercentage() {
        let totalTargetPercentage: number = 0
        this.assetListEntries.forEach((value, key) => {
            switch (value.entryType) {
                case AssetListEntryTypeEnum.PUBLIC_HOLDING:
                    totalTargetPercentage = totalTargetPercentage + value.publicHolding!.targetPercentage
                    break;
                case AssetListEntryTypeEnum.PRIVATE_HOLDING:
                    totalTargetPercentage = totalTargetPercentage + value.privateHolding!.targetPercentage
                    break;
                case AssetListEntryTypeEnum.HOLDING_GROUP:
                    this.assetListEntries[key].holdingGroup!.publicHoldings.forEach((value) => {
                        totalTargetPercentage = totalTargetPercentage + value.targetPercentage
                    })
                    this.assetListEntries[key].holdingGroup!.privateHoldings.forEach((value) => {
                        totalTargetPercentage = totalTargetPercentage + value.targetPercentage
                    })
                    break;
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
    },

    /**
     * Take a value and explode it into an array that can be used to access the single values
     *
     * @param assetValue
     *
     * @returns {string[]}
     */
    getValueArray(assetValue: number): string[] {
      // Parse the value of the asset to string
      const valueString: string = assetValue.toString()

      // create the value array by splitting the float
      const valueArray: string[] = valueString.split('.')

      const firstDigit = valueArray[0]
      let firstDecimal = valueArray[1]
      let secondDecimal = ''

      // If the first decimal is only one character long, add a zero to its end
      if (firstDecimal.length === 1) {
        firstDecimal = firstDecimal + '0'
      }

      // If the first decimal is greater than two characters, split it
      if (firstDecimal.length > 2) {
        secondDecimal = firstDecimal.slice(2, 3)
        firstDecimal = firstDecimal.slice(0, 2)
      }

      return [firstDigit, firstDecimal, secondDecimal]
    },

    /**
     * Map the currency of an assets to its symbol
     *
     * @param currency string
     */
    mapCurrency(currency: CurrencyEnum): string {
      switch (currency) {
        default:
        case CurrencyEnum.UNSUPPORTED:
          return '?'
        case CurrencyEnum.EUR:
          return '€'
        case CurrencyEnum.USD:
          return '$'
      }
    },
  },
})
