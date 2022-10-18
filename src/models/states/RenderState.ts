import type { AssetRenderingEntry } from '@/models/holdings/AssetRenderingEntry'

export interface RenderState {
  assetList: Map<string, AssetRenderingEntry>
  loadingFlag: boolean
}
