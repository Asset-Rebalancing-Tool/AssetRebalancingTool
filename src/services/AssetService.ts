//import axios from 'axios'
import ownedGroups from '../data/ownedGroups.json'
import ownedAssets from '../data/ownedAssets.json'
import type { IOwnedPrivateGroups } from '@/models/old/IOwnedPrivateGroups'
import type { IOwnedPublicAssets } from '@/models/old/IOwnedPublicAssets'
import axios from 'axios'

export default {
  fetchOwnedGroups(): IOwnedPrivateGroups {
    return ownedGroups as IOwnedPrivateGroups
  },
  fetchOwnedAssets(): IOwnedPublicAssets {
    return ownedAssets as IOwnedPublicAssets
  },

  async searchAssets(searchString: string) {
    try {
      const { data } = await axios.post(
        '/api/asset_api/asset/search',
        { SearchString: searchString },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      )
      return data
    } catch (error) {
      /*console.log(
        axios.isAxiosError(error)
          ? error.message
          : 'An unexpected error occurred'
      )*/
    }
  },
}
