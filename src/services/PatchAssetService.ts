import type { PublicHoldingRequest } from '@/requests/PublicHoldingRequest'
import type { PublicHolding } from '@/models/PublicHolding'
import { login, getAuthorizedInstance } from '@/services/TokenService'
import axios from 'axios'
import type { AxiosResponse } from 'axios'

export default {
  async patchPublicAssetsHolding(
    publicAssetHoldingRequest: PublicHoldingRequest,
    holdingUuid: string,
    abortController: AbortController
  ): Promise<PublicHolding> {
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
