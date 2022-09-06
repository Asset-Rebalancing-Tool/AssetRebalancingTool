import type { AssetTypeEnum } from '@/models/enums/AssetTypeEnum'
import type { IPriceRecord } from '@/models/nested/IPriceRecord'
import type { IAssetInformation } from '@/models/nested/IAssetInformation'
import type { CurrencyEnum } from '@/models/enums/CurrencyEnum'
import type { UnitType } from '@/models/enums/UnitTypeEnum'
import type { IPublicAssetHolding } from '@/models/IPublicAssetHolding'

export enum HoldingEnum {}

export interface AssetHolding {
  holdingUuid: string
  assetName: string
  assetType: AssetTypeEnum
  currentPrice: number
  targetPercentage: number
  assetPriceRecords: IPriceRecord[]
  assetInformations: IAssetInformation[]
  symbol: string | null
  isin: string | null
  availableCurrencies: CurrencyEnum[]
  availableUnitTypes: UnitType[]
  icon: string | null
  assetHoldingType: HoldingEnum
}

export function assetHolding(privateAssetHolding: IPublicAssetHolding) {}

export function assetHolding(privateAssetHolding: IPublicAssetHolding) {}
