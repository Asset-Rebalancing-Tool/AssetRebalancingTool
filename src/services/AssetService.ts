//import axios from 'axios'
import ownedGroups from '../data/ownedGroups.json'
import ownedAssets from '../data/ownedAssets.json'
import type { IOwnedPrivateGroups } from '@/models/old/IOwnedPrivateGroups'
import type { IOwnedPublicAssets } from '@/models/old/IOwnedPublicAssets'
import axios from 'axios'

/*const apiClient = axios.create({
  baseURL: 'http://localhost:8080/asset_api/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})*/

export default {
  fetchOwnedGroups(): IOwnedPrivateGroups {
    return ownedGroups as IOwnedPrivateGroups
  },
  fetchOwnedAssets(): IOwnedPublicAssets {
    return ownedAssets as IOwnedPublicAssets
  },

  async searchAssets(searchString: String) {
    try {
      const { data } = await axios.post(
          '/api/asset_api/asset/search',
          { SearchString: searchString },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            }
          }
        )
      return data;
    } catch(error) {
      // @ts-ignore
      console.log((axios.isAxiosError(error))
          ? error.message
          : 'An unexpected error occurred')
    }
  }
}
