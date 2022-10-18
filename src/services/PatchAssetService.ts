import type { PublicHoldingRequest } from '@/requests/PublicHoldingRequest'
import type { PrivateHoldingRequest } from '@/requests/PrivateHoldingRequest'
import {
  getAuthorizedInstance,
  handleErrorResponseStatus,
} from '@/services/TokenService'
import type { AxiosResponse } from 'axios'
import type { HoldingGroupRequest } from '@/requests/HoldingGroupRequest'
import { patchAssetPoolEntry } from '@/composables/UseAssetPool'
import type { AssetPoolEntry } from '@/models/AssetPoolEntry'
import { EntryTypeEnum } from '@/models/holdings/EntryTypeEnum'

let abortController: AbortController | null = new AbortController()
let timer: ReturnType<typeof setTimeout> | null = null

export default {
  /**-***********************************************************************-**/
  /**--------------------------- Patch Holdings ------------------------------**/
  /**-***********************************************************************-**/

  /**
   * Patch a public holding based on its uuid
   *
   * @param request PublicHoldingRequest
   * @param uuid string
   */
  async patchPublicHolding(
    request: PublicHoldingRequest,
    uuid: string
  ): Promise<void> {
    this.requestRestrictionHandling().then(() => {
      // Fetch each time the timer expires
      timer = setTimeout(async () => {
        return getAuthorizedInstance()
          .then((instance) => {
            abortController = new AbortController()
            return instance.patch(
              `/holding_api/asset_holding/public/${uuid}`,
              request,
              {
                signal: abortController.signal as AbortSignal,
              }
            )
          })
          .then((response: AxiosResponse) => {
            const patchedEntry = response.data as AssetPoolEntry
            patchedEntry.entryType = EntryTypeEnum.PUBLIC_HOLDING
            patchAssetPoolEntry(patchedEntry)
          })
          .catch((error) => console.log(error)) //handleErrorResponseStatus(error.response.status)
      }, 500)
    })
  },

  /**
   * Patch a private holding based on its uuid
   *
   * @param request PrivateHoldingRequest
   * @param holdingUuid string
   */
  async patchPrivateHolding(
    request: PrivateHoldingRequest,
    holdingUuid: string
  ): Promise<void> {
    this.requestRestrictionHandling().then(() => {
      // Fetch each time the timer expires
      timer = setTimeout(async () => {
        return getAuthorizedInstance()
          .then((instance) => {
            return instance.patch(
              `/holding_api/asset_holding/private/${holdingUuid}`,
              request
            )
          })
          .then((response: AxiosResponse) => {
            const patchedEntry = response.data as AssetPoolEntry
            patchedEntry.entryType = EntryTypeEnum.PRIVATE_HOLDING
            patchAssetPoolEntry(patchedEntry)
          })
          .catch((error) => handleErrorResponseStatus(error))
      }, 500)
    })
  },

  /**
   * Patch a holding group based on its uuid
   *
   * @param request PrivateHoldingRequest
   * @param groupUuid string
   */
  async patchHoldingGroup(
    request: HoldingGroupRequest,
    groupUuid: string
  ): Promise<void> {
    this.requestRestrictionHandling().then(() => {
      // Fetch each time the timer expires
      timer = setTimeout(async () => {
        return getAuthorizedInstance()
          .then((instance) => {
            return instance.patch(
              `/holding_api/asset_holding/group/${groupUuid}`,
              request
            )
          })
          .then((response: AxiosResponse) => {
            const patchedEntry = response.data as AssetPoolEntry
            patchedEntry.entryType = EntryTypeEnum.HOLDING_GROUP
            patchAssetPoolEntry(patchedEntry)
          })
          .catch((error) => handleErrorResponseStatus(error))
      }, 500)
    })
  },

  /**-***********************************************************************-**/
  /**------------------------- Auxiliary Methods -----------------------------**/
  /**-***********************************************************************-**/

  requestRestrictionHandling(): Promise<void> {
    // Always abort previous requests
    if (abortController) {
      abortController.abort()
      abortController = null
    }

    // If this method is called before the timer has expired, reset it
    // If there is no timer and therefore no request, set the isLoading flag to true
    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    return new Promise<void>((resolve) => resolve())
  },
}
