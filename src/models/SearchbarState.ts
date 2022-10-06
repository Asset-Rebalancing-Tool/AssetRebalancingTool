import type { PublicAsset } from "@/models/PublicAsset";

export interface SearchbarState {
    searchString: string
    searchbarAssets: PublicAsset[]
    searchbarResultCount: number
    searchbarLoadingFlag: boolean
    activeModalUnderlay: boolean
}