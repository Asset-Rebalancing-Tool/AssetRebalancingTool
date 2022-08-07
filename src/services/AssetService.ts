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

  // TODO: like real
  async searchAsset(searchString: string) {
    axios
      .post('assets/search', {
        SearchString: searchString,
      })
      .then((response) => {
        console.log(response.data)
        //return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
