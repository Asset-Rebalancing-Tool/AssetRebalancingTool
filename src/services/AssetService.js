import axios from 'axios'

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
    return apiClient.get('/asset-groups')
  },
  getAssetGroup(groupId) {
    return apiClient.get('/asset-groups/' + groupId)
  },
  getAssets() {
    return apiClient.get('/assets')
  },
  getAsset(assetId) {
    return apiClient.get('/assets/' + assetId)
  }
}
