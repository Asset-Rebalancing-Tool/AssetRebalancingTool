import type { PublicHoldingRequest } from '@/requests/PublicHoldingRequest'
import type { PrivateHoldingRequest } from '@/requests/PrivateHoldingRequest'
import type { PublicHolding } from '@/models/PublicHolding'
import type { PrivateHolding } from '@/models/PrivateHolding'
import { login, getAuthorizedInstance } from '@/services/TokenService'
import type { AxiosResponse } from 'axios'

export default {
  /**
   * Build the request body for the public holding patch
   *
   * @param inputData string
   */
  publicHoldingPatchRequest(inputData: string): PublicHoldingRequest {
    const data: number = +inputData
    return { data } as unknown as PublicHoldingRequest
  },

  /**
   * Build the request body for the private holding patch
   *
   * @param inputData string
   */
  privateHoldingPatchRequest(inputData: string): PrivateHoldingRequest {
    const data: number = +inputData
    return { data } as unknown as PrivateHoldingRequest
  },

  /**
   * Patch a public holding based on its uuid
   *
   * @param inputData string
   * @param holdingUuid string
   * @param abortController AbortController
   */
  async patchPublicHolding(
    inputData: string,
    holdingUuid: string,
    abortController: AbortController
  ): Promise<PublicHolding> {
    await login('sclaes', 'pw')
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.patch(
          `/holding_api/asset_holding/public/${holdingUuid}`,
          this.publicHoldingPatchRequest(inputData),
          {
            signal: abortController.signal as AbortSignal,
          }
        )
      })
      .then((response: AxiosResponse) => {
        return response.data
      })
  },

  /**
   * Patch a private holding based on its uuid
   *
   * @param inputData string
   * @param holdingUuid string
   * @param abortController AbortController
   */
  async patchPrivateHolding(
    inputData: string,
    holdingUuid: string,
    abortController: AbortController
  ): Promise<PrivateHolding> {
    await login('sclaes', 'pw')
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.patch(
          `/holding_api/asset_holding/private/${holdingUuid}`,
          this.privateHoldingPatchRequest(inputData),
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
