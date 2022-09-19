import type { AxiosResponse } from 'axios'
import type { PublicHolding } from '@/models/holdings/PublicHolding'
import type { PrivateHolding } from '@/models/holdings/PrivateHolding'
import type { HoldingGroup } from '@/models/holdings/HoldingGroup'
import type { PublicAsset } from '@/models/PublicAsset'
import {getAuthorizedInstance, handleErrorResponseStatus} from '@/services/TokenService'
export default {

  async fetchPublicHoldings(): Promise<PublicHolding[]> {
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.get('/holding_api/asset_holding/public', {
          params: { groupLess: true },
        })
      })
      .then((response: AxiosResponse) => {
        return response.data
      }).catch(error => handleErrorResponseStatus(error.response.status))
  },

  async fetchPrivateHoldings(): Promise<PrivateHolding[]> {
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.get('/holding_api/asset_holding/private', {
          params: { groupLess: true },
        })
      })
      .then((response: AxiosResponse) => {
        return response.data
      }).catch(error => handleErrorResponseStatus(error.response.status))
  },

  async fetchHoldingGroups(): Promise<HoldingGroup[]> {
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.get('/holding_api/asset_holding/group')
      })
      .then((response: AxiosResponse) => {
        return response.data
      }).catch(error => handleErrorResponseStatus(error.response.status))
  },

  async fetchPublicAssets(
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
      }).catch(error => handleErrorResponseStatus(error.response.status))
  },
}
