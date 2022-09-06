import type { PublicAssetHoldingRequest } from '@/requests/PublicAssetHoldingRequest'
import type { IPublicAssetHolding } from '@/models/IPublicAssetHolding'
import { login, getAuthorizedInstance } from '@/services/TokenService'
import axios from 'axios'
import type { AxiosResponse } from 'axios'

export default {
  async patchPublicAssetsHolding(
    publicAssetHoldingRequest: PublicAssetHoldingRequest,
    holdingUuid: string,
    abortController: AbortController
  ): Promise<IPublicAssetHolding> {
    await login('sclaes', 'pw')
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.patch(
          `/holding_api/asset_holding/public/${holdingUuid}`,
          publicAssetHoldingRequest,
          {
            signal: abortController.signal as AbortSignal,
          }
        )
      })
      .then((response: AxiosResponse) => {
        return response.data
      })
  },
}
