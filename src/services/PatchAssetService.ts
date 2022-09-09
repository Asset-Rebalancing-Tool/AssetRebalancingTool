import type { PublicHoldingRequest } from '@/requests/PublicHoldingRequest'
import type { PrivateHoldingRequest } from '@/requests/PrivateHoldingRequest'
import type { GenericHolding } from '@/models/holdings/GenericHolding'
import { login, getAuthorizedInstance } from '@/services/TokenService'
import type { AxiosResponse } from 'axios'
import type {HoldingGroupRequest} from "@/requests/HoldingGroupRequest";
import { useAssetStore } from '@/stores/AssetStore';


export default {

  /**
   * Patch a public holding based on its uuid
   *
   * @param request PublicHoldingRequest
   * @param holdingUuid string
   */
  async patchPublicHolding(
    request: PublicHoldingRequest,
    holdingUuid: string,
  ): Promise<void> {
    await login('claes', 'pw')
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.patch(`/holding_api/asset_holding/public/${holdingUuid}`, request)
      })
      .then((response: AxiosResponse) => {
        useAssetStore().updatePublicHolding(response.data)
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
    holdingUuid: string,
  ): Promise<void> {
    await login('claes', 'pw')
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.patch(`/holding_api/asset_holding/private/${holdingUuid}`, request)
      })
      .then((response: AxiosResponse) => {
        useAssetStore().updatePrivateHolding(response.data)
      })
  },

  /**
   * Patch a holding group based on its uuid
   *
   * @param request PrivateHoldingRequest
   * @param holdingUuid string
   */
  async patchHoldingGroup(
      request: HoldingGroupRequest,
      holdingUuid: string,
  ): Promise<void> {
    await login('claes', 'pw')
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.patch(`/holding_api/asset_holding/group/${holdingUuid}`, request)
      })
      .then((response: AxiosResponse) => {
        useAssetStore().updateHoldingGroup(response.data)
      })
  },

  async deletePublicHolding(holdingUuid: string) {
    await login('claes', 'pw')
    return getAuthorizedInstance()
        .then((instance) => {
          return instance.delete(`/holding_api/asset_holding/public/${holdingUuid}`)
        })
        .then((response: AxiosResponse) => {
          useAssetStore().updatePrivateHolding(response.data)
        })
  },

  async deletePrivateHolding(holdingUuid: string) {
    await login('claes', 'pw')
    return getAuthorizedInstance()
        .then((instance) => {
          return instance.delete(`/holding_api/asset_holding/private/${holdingUuid}`)
        })
        .then((response: AxiosResponse) => {
          useAssetStore().updatePrivateHolding(response.data)
        })
  },
}
