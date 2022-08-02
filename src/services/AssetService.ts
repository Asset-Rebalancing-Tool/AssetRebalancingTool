//import axios from 'axios'
import ownedGroups from '../data/ownedGroups.json'
import ownedAssets from '../data/ownedAssets.json'


import type { IOwnedPrivateGroups } from "@/models/IOwnedPrivateGroups";
import type { IOwnedPublicAssets } from "@/models/IOwnedPublicAssets";

/*const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})*/

export default {
  fetchOwnedGroups(): IOwnedPrivateGroups {
    return ownedGroups as IOwnedPrivateGroups
  },
  fetchOwnedAssets(): IOwnedPublicAssets {
    return ownedAssets as IOwnedPublicAssets
  },

  // TODO: like real
  /* fetchUnusedAsset(assetId: number): Promise<OwnedAssets>
  {
    return apiClient.get('/assets/' + assetId)
  } */
}
