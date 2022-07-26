import axios from 'axios'
import assetGroups from '@/data/assetGroups.json'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getAssetGroups() {
    //return apiClient.get('/asset-groups')

    // TODO: remove along with import after the api is finished
    return assetGroups
  },
  getAssetGroup(groupId) {
    return apiClient.get('/asset-groups/' + groupId)
  },
  getAsset(assetId) {
    return apiClient.get('/assets/' + assetId)
  }
}
