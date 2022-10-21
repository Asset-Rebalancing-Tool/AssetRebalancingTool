import type { AxiosResponse } from 'axios'
import type { PublicHolding } from '@/models/holdings/PublicHolding'
import type { PrivateHolding } from '@/models/holdings/PrivateHolding'
import type { HoldingGroup } from '@/models/holdings/HoldingGroup'
import type { PublicAsset } from '@/models/PublicAsset'
import {
  getAuthorizedInstance,
  showFlashMessage,
} from '@/services/TokenService'
import { i18n } from '@/i18n'

export default {
  async fetchPublicHoldings(): Promise<PublicHolding[]> {
    const { t } = i18n.global
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.get('/holding_api/asset_holding/public', {
          params: { groupLess: true },
        })
      })
      .then((response: AxiosResponse) => {
        return response.data
      })
      .catch((error) => {
        switch (error.response.status) {
          default:
            console.log(
              'FetchAssetService.ts no status case ' + error.response.status
            )
            break
        }
      })
  },

  async fetchPrivateHoldings(): Promise<PrivateHolding[]> {
    const { t } = i18n.global
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.get('/holding_api/asset_holding/private', {
          params: { groupLess: true },
        })
      })
      .then((response: AxiosResponse) => response.data)
      .catch((error) => {
        switch (error.response.status) {
          default:
            console.log(
              'FetchAssetService.ts no status case ' + error.response.status
            )
            break
        }
      })
  },

  async fetchHoldingGroups(): Promise<HoldingGroup[]> {
    const { t } = i18n.global
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.get('/holding_api/asset_holding/group')
      })
      .then((response: AxiosResponse) => {
        return response.data
      })
      .catch((error) => {
        switch (error.response.status) {
          default:
            console.log(
              'FetchAssetService.ts no status case ' + error.response.status
            )
            break
        }
      })
  },

  async fetchPublicAssets(
    searchValue: string,
    abortController: AbortController
  ): Promise<PublicAsset[]> {
    const { t } = i18n.global
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
      .catch((error) => {
        switch (error.response.status) {
          default:
            console.log(
              'FetchAssetService.ts no status case ' + error.response.status
            )
            break
        }
      })
  },
}
