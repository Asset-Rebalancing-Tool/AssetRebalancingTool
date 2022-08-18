import ownedGroups from '../data/ownedGroups.json'
import ownedAssets from '../data/ownedAssets.json'
import type { IOwnedPrivateGroups } from '@/models/old/IOwnedPrivateGroups'
import type { IOwnedPublicAssets } from '@/models/old/IOwnedPublicAssets'
import type { IPublicAsset } from '@/models/IPublicAsset';
import type { AxiosResponse } from 'axios';
import axios from "axios";

export default {
  fetchOwnedGroups(): IOwnedPrivateGroups {
    return ownedGroups as IOwnedPrivateGroups
  },
  fetchOwnedAssets(): IOwnedPublicAssets {
    return ownedAssets as IOwnedPublicAssets
  },
  fetchPublicAssets(searchValue: string): Promise<IPublicAsset[]> {
    return axios
        .post('/asset_api/asset/search', { SearchString: searchValue })
        .then((response: AxiosResponse) => {
          // Ensure that the response isn't an empty string
          if (response.data !== '') {
              return response.data
          }
          return [] as IPublicAsset[]
        })
        .catch (function(error) {
          return [] as IPublicAsset[]
        })
  }
}
