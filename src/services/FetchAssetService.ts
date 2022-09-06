import type { AxiosResponse } from 'axios'
import axios from 'axios'
import type { IPublicAssetHolding } from '@/models/IPublicAssetHolding'
import type { IPrivateAssetHolding } from '@/models/IPrivateAssetHolding'
import type { PrivateAssetHoldingRequest } from '@/requests/PrivateAssetHoldingRequest'
import type { IAssetHoldingGroup } from '@/models/IAssetHoldingGroup'
import type { IPublicAsset } from '@/models/IPublicAsset'
import { login, getAuthorizedInstance } from '@/services/TokenService'
import { AssetTypeEnum } from '@/models/enums/AssetTypeEnum'
import type { PublicAssetHoldingRequest } from '@/requests/PublicAssetHoldingRequest'

export default {
  // Asset Holdings

  async fetchPublicAssetHoldings(): Promise<IPublicAssetHolding[]> {
    await login('sclaes', 'pw')
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.get('/holding_api/asset_holding/public')
      })
      .then((response: AxiosResponse) => {
        return response.data
      })
  },

  async fetchPrivateAssetHoldings(): Promise<IPrivateAssetHolding[]> {
    await login('sclaes', 'pw')
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.get('/holding_api/asset_holding/private')
      })
      .then((response: AxiosResponse) => {
        return response.data
      })
  },

  async fetchAssetHoldingGroups(): Promise<IAssetHoldingGroup[]> {
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
  ): Promise<IPublicAsset[]> {
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
        return [] as IPublicAsset[]
      })
  },
}
