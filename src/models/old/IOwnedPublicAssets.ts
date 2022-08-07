import type { IOwnedPublicAsset } from '@/models/old/IOwnedPublicAsset'

export interface IOwnedPublicAssets {
  [uuid: string]: IOwnedPublicAsset
}
