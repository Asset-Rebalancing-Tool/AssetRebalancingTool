import type { PublicHoldingRequest } from '@/requests/PublicHoldingRequest'
import type { PrivateHoldingRequest } from '@/requests/PrivateHoldingRequest'
import {
  getAuthorizedInstance,
  handleErrorResponseStatus,
} from '@/services/TokenService'
import type { AxiosResponse } from 'axios'
import type { HoldingGroupRequest } from '@/requests/HoldingGroupRequest'
import { useAssetStore } from '@/stores/AssetStore'

export default {
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
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.patch(
          `/holding_api/asset_holding/public/${uuid}`,
          request
        )
      })
      .then((response: AxiosResponse) => {
        useAssetStore().replaceListEntry(response.data)
      })
      .catch((error) => handleErrorResponseStatus(error.response.status))
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
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.patch(
          `/holding_api/asset_holding/private/${holdingUuid}`,
          request
        )
      })
      .then((response: AxiosResponse) => {
        useAssetStore().replaceListEntry(response.data)
      })
      .catch((error) => handleErrorResponseStatus(error.response.status))
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
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.patch(
          `/holding_api/asset_holding/group/${groupUuid}`,
          request
        )
      })
      .then((response: AxiosResponse) => {
        useAssetStore().replaceListEntry(response.data)
      })
      .catch((error) => handleErrorResponseStatus(error.response.status))
  },

  async deletePublicHolding(holdingUuid: string) {
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.delete(
          `/holding_api/asset_holding/public/${holdingUuid}`
        )
      })
      .then((response: AxiosResponse) => {})
      .catch((error) => handleErrorResponseStatus(error.response.status))
  },

  async deletePrivateHolding(holdingUuid: string) {
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.delete(
          `/holding_api/asset_holding/private/${holdingUuid}`
        )
      })
      .then((response: AxiosResponse) => {})
      .catch((error) => handleErrorResponseStatus(error.response.status))
  },
}
