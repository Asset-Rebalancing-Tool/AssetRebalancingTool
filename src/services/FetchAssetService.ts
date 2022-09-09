import type { AxiosResponse } from 'axios'
import axios from 'axios'
import type { PublicHolding } from '@/models/PublicHolding'
import type { PrivateHolding } from '@/models/PrivateHolding'
import type { HoldingGroup } from '@/models/HoldingGroup'
import type { PublicAsset } from '@/models/PublicAsset'
import { login, getAuthorizedInstance } from '@/services/TokenService'
export default {

  async fetchPublicHoldings(): Promise<PublicHolding[]> {
    await login('claes', 'pw')
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.get('/holding_api/asset_holding/public', {
          params: { groupLess: true },
        })
      })
      .then((response: AxiosResponse) => {
        console.log(response.data)
        return response.data
      })
  },

  async fetchPrivateHoldings(): Promise<PrivateHolding[]> {
    await login('claes', 'pw')
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.get('/holding_api/asset_holding/private', {
          params: { groupLess: true },
        })
      })
      .then((response: AxiosResponse) => {
        return response.data
      })
  },

  async fetchHoldingGroups(): Promise<HoldingGroup[]> {
    await login('claes', 'pw')
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.get('/holding_api/asset_holding/group')
      })
      .then((response: AxiosResponse) => {
        return response.data
      })
  },

  async fetchPublicAssets(
    searchValue: string,
    abortController: AbortController
  ): Promise<PublicAsset[]> {
    await login('claes', 'pw')
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
