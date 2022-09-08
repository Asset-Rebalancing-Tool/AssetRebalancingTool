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
   * @param inputValue string
   */
  publicHoldingPatchRequest(inputValue: string): PublicHoldingRequest {
    const data: number = +inputValue
    return { data } as unknown as PublicHoldingRequest
  },

  /**
   * Build the request body for the private holding patch
   *
   * @param inputValue string
   */
  privateHoldingPatchRequest(inputValue: string): PrivateHoldingRequest {
    const data: number = +inputValue
    return { data } as unknown as PrivateHoldingRequest
  },

  /**
   * Patch a public holding based on its uuid
   *
   * @param inputValue string
   * @param holdingUuid string
   * @param abortController AbortController
   */
  async patchPublicHolding(
    inputValue: string,
    holdingUuid: string,
    abortController: AbortController
  ): Promise<void> {
    // Only fetch if the input value is numeric
    if (+inputValue) return

    await login('sclaes', 'pw')
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.patch(
          `/holding_api/asset_holding/public/${holdingUuid}`,
          this.publicHoldingPatchRequest(inputValue),
          {
            signal: abortController.signal as AbortSignal,
          }
        )
      })
      .then((response: AxiosResponse) => {
        // TODO: Find holding in asset store and replace it
        //return response.data
      })
  },

  /**
   * Patch a private holding based on its uuid
   *
   * @param inputValue string
   * @param holdingUuid string
   * @param abortController AbortController
   */
  async patchPrivateHolding(
    inputValue: string,
    holdingUuid: string,
    abortController: AbortController
  ): Promise<void> {
    // Only fetch if the input value is numeric
    if (+inputValue) return

    await login('sclaes', 'pw')
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.patch(
          `/holding_api/asset_holding/private/${holdingUuid}`,
          this.privateHoldingPatchRequest(inputValue),
          {
            signal: abortController.signal as AbortSignal,
          }
        )
      })
      .then((response: AxiosResponse) => {
        // TODO: Find holding in asset store and replace it
        //return response.data
      })
  },
}
