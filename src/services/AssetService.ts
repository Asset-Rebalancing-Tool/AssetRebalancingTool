import axios from 'axios'
import ownedGroups from '../data/ownedGroups.json'
import ownedAssets from '../data/ownedAssets.json'


import { IOwnedGroups } from '@/models/IOwnedGroups';
import { IOwnedAssets } from '@/models/IOwnedAssets';

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
  fetchOwnedAssets(): IOwnedAssets {
    return ownedAssets as IOwnedAssets
  },

  // TODO: like real
  /* fetchUnusedAsset(assetId: number): Promise<OwnedAssets>
  {
    return apiClient.get('/assets/' + assetId)
  } */
}
