import { useAssetStore } from '@/stores/AssetStore'
import type { IPublicAsset } from '@/models/IPublicAsset'
import type { AssetTypeEnum } from '@/models/enums/AssetTypeEnum'

/**
 * Get the asset type by passing the uuid of an asset
 *
 * @param uuid string
 */
export function mapAssetTypeByUUid(uuid: string) {
  const assetStore = useAssetStore()
  const asset: IPublicAsset = assetStore.getSearchbarAsset(uuid)
  return mapAssetType(asset.assetType)
}

/**
 * Map the asset type to its german value
 *
 * @param assetType AssetTypeEnum
 */
export function mapAssetType(assetType: AssetTypeEnum): string {
  switch (assetType) {
    default:
    case 'Other':
      return 'Anderes'
    case 'Stock':
      return 'Aktie'
    case 'Fond':
      return 'Fond'
    case 'Etf':
      return 'ETF'
    case 'Commodity':
      return 'Rohstoff'
    case 'PreciousMetals':
      return 'Edelmetall'
    case 'Crypto':
      return 'Kryptowährung'
  }
}
