import type { IPublicAssetHolding } from "@/models/IPublicAssetHolding";
import type { IPrivateAssetHolding } from "@/models/IPrivateAssetHolding";


export interface IAssetHoldingGroup {
    groupName: string
    publicAssetHoldings: IPublicAssetHolding[]
    privateAssetHoldings: IPrivateAssetHolding[]
    targetPercentage: number
    targetPercentagesAddUp: boolean
    uuid: string
}
