import type { IOwnedPublicAsset } from '@/models/IOwnedPublicAsset'

export interface IOwnedPublicAssets {
    [uuid: string]: IOwnedPublicAsset
}
