import axios from 'axios'
import type { IPublicAssetHolding } from '@/models/IPublicAssetHolding';
import type { IPublicAsset } from '@/models/IPublicAsset'
import type { AxiosResponse } from 'axios'
import { getToken, login } from '@/composables/getToken';


export default {

  async fetchPublicAssetHoldings(): Promise<IPublicAssetHolding[]> {
    await login('claes', 'pw')
    return getToken().then(token => {
          return axios.get('/holding_api/asset_holding/public',
          {
            headers: {
              Authorization: 'Bearer ' + token
            }
          })
    }).then((response: AxiosResponse) => {
      return response.data
    })
  },

  fetchPublicAssets(
    searchValue: string,
    abortController: AbortController
  ): Promise<IPublicAsset[]> {
    return getToken().then(token => {
      return axios
          .post(
              '/asset_api/asset/search',
              {
                SearchString: searchValue,
              },
              {
                signal: abortController.signal as AbortSignal,
                headers: {
                  Authorization: 'Bearer ' + token
                }
              }
          )
    }).then((response: AxiosResponse) => {
      // Ensure that the response isn't an empty string
      if (response.data !== '') {
        return response.data
      }
      return [] as IPublicAsset[]
    })
  },
}
