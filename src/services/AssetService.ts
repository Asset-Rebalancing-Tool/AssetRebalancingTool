import axios from 'axios'
import ownedGroups from '../data/ownedGroups.json'
import ownedAssets from '../data/ownedAssets.json'


import { IOwnedGroups } from '@/models/IOwnedGroups';
import { IOwnedPublicAssets } from '@/models/IOwnedPublicAssets';

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  fetchOwnedGroups(): IOwnedGroups {
    return ownedGroups as IOwnedGroups
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
