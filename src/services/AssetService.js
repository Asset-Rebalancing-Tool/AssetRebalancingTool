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
  fetchAssetGroups() {
    // return apiClient.get('/asset-groups')
    // TODO: remove along with import after the api is finished (if it needs to be async have a look at commit cc178fc6cffe8eec8c9fbd3ea81c7c240a7ee8db)
    return assetGroups
  },
  fetchUnusedAsset(assetId) {
    return apiClient.get('/assets/' + assetId)
  }
}
