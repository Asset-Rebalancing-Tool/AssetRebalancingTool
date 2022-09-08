import type { AxiosResponse } from 'axios'
import axios from 'axios'
import type { PublicHolding } from '@/models/PublicHolding'
import type { PrivateHolding } from '@/models/PrivateHolding'
import type { PrivateHoldingRequest } from '@/requests/PrivateHoldingRequest'
import type { HoldingGroup } from '@/models/HoldingGroup'
import type { PublicAsset } from '@/models/PublicAsset'
import { login, getAuthorizedInstance } from '@/services/TokenService'
import { AssetTypeEnum } from '@/models/enums/AssetTypeEnum'
import type { PublicHoldingRequest } from '@/requests/PublicHoldingRequest'

export default {
  // Asset Holdings

  async fetchPublicAssetHoldings(): Promise<PublicHolding[]> {
    await login('sclaes', 'pw')
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.get('/holding_api/asset_holding/public', {
          params: { groupLess: true }
        })
      })
      .then((response: AxiosResponse) => {
        return response.data
      })
  },

  async fetchPrivateAssetHoldings(): Promise<PrivateHolding[]> {
    await login('sclaes', 'pw')
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.get('/holding_api/asset_holding/private', {
          params: { groupLess: true }
        })
      })
      .then((response: AxiosResponse) => {
        return response.data
      })
  },

  async fetchAssetHoldingGroups(): Promise<HoldingGroup[]> {
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.get('/holding_api/asset_holding/group')
      })
      .then((response: AxiosResponse) => {
        return response.data
      })
  },

  fetchPublicAssets(
    searchValue: string,
    abortController: AbortController
  ): Promise<PublicAsset[]> {
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.post(
          '/asset_api/asset/search',
          { SearchString: searchValue },
          { signal: abortController.signal as AbortSignal }
        )
      })
      .then((response: AxiosResponse) => {
        // Ensure that the response isn't an empty string
        if (response.data !== '') {
          return response.data
        }
        return [] as PublicAsset[]
      })
  },
}
