import axios from 'axios'
import ownedGroups from '../data/ownedGroups.json'
import ownedAssets from '../data/ownedAssets.json'
import type { IOwnedPrivateGroups } from '@/models/old/IOwnedPrivateGroups'
import type { IOwnedPublicAssets } from '@/models/old/IOwnedPublicAssets'
export default {
  fetchOwnedGroups(): IOwnedPrivateGroups {
    return ownedGroups as IOwnedPrivateGroups
  },
  fetchOwnedAssets(): IOwnedPublicAssets {
    return ownedAssets as IOwnedPublicAssets
  },

  async searchAssets(searchString: string) {
    axios
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
      .then((response) => {
        console.log(response.data, 'AssetService::response.data')
        return response.data
      })
      .catch((error) => {
        // @ts-ignore that IDE can't find name console
        console.log(error)
      })
  },
}
