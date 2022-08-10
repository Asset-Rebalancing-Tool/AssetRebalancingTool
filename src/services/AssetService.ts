import axios from 'axios'
import type { AxiosResponse } from 'axios'
import ownedGroups from '../data/ownedGroups.json'
import ownedAssets from '../data/ownedAssets.json'
import type { IOwnedPrivateGroups } from '@/models/old/IOwnedPrivateGroups'
import type { IOwnedPublicAssets } from '@/models/old/IOwnedPublicAssets'
import type { IPublicAsset } from '@/models/IPublicAsset'

export default {
  fetchOwnedGroups(): IOwnedPrivateGroups {
    return ownedGroups as IOwnedPrivateGroups
  },
  fetchOwnedAssets(): IOwnedPublicAssets {
    return ownedAssets as IOwnedPublicAssets
  },

  async searchAssets(searchString: string): Promise<IPublicAsset[]> {
    return axios
      .post(
        '/api/asset_api/asset/search',
        {
          SearchString: searchString,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      )
      .then((response: AxiosResponse<IPublicAsset[]>) => {
        return response.data
      })
  },
}
