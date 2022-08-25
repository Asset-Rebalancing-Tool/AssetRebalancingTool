import type { IOwnedPrivateGroups } from '@/models/old/IOwnedPrivateGroups'
import type { IOwnedPublicAssets } from '@/models/old/IOwnedPublicAssets'
import type { IPublicAsset } from '@/models/IPublicAsset'
import type { AxiosResponse } from 'axios'
import axios from 'axios'

export default {
  fetchOwnedGroups(): IOwnedPrivateGroups {
    // return ownedGroups as IOwnedPrivateGroups
    return {} as IOwnedPrivateGroups
  },
  fetchOwnedAssets(): IOwnedPublicAssets {
    //return ownedAssets as IOwnedPublicAssets
    return {} as IOwnedPublicAssets
  },
  fetchPublicAssets(
    searchValue: string,
    abortController: AbortController
  ): Promise<IPublicAsset[]> {
    return axios
      .post(
        '/asset_api/asset/search',
        {
          SearchString: searchValue,
        },
        {
          signal: abortController.signal as AbortSignal,
        }
      )
      .then((response: AxiosResponse) => {
        // Ensure that the response isn't an empty string
        if (response.data !== '') {
          return response.data
        }
        return [] as IPublicAsset[]
      })
      .catch(function (error) {
        console.log(error)
        return [] as IPublicAsset[]
      })
  },
}
