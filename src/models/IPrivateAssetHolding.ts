import type { AssetTypeEnum } from "@/models/enums/AssetTypeEnum";

export interface IPrivateAssetHolding {
    assetType: AssetTypeEnum
    currentPrice: number
    holdingUuid: string
    title: string
    targetPercentage: number
}
