import type { PublicHoldingRequest } from '@/requests/PublicHoldingRequest'
import type { PrivateHoldingRequest } from '@/requests/PrivateHoldingRequest'
import { login, getAuthorizedInstance } from '@/services/TokenService'
import type { AxiosResponse } from 'axios'
import type {HoldingGroupRequest} from "@/requests/HoldingGroupRequest";
import { useAssetStore } from '@/stores/AssetStore';


export default {

  /**
   * Patch a public holding based on its uuid
   *
   * @param request PublicHoldingRequest
   * @param uuid string
   */
  async patchPublicHolding(
    request: PublicHoldingRequest,
    uuid: string,
  ): Promise<void> {
    await login('claes', 'pw')
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.patch(`/holding_api/asset_holding/public/${uuid}`, request)
      })
      .then((response: AxiosResponse) => {
        useAssetStore().updateAssetListEntry(response.data)
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
        useAssetStore().updateAssetListEntry(response.data)
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
      groupUuid: string,
  ): Promise<void> {
    await login('claes', 'pw')
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.patch(`/holding_api/asset_holding/group/${groupUuid}`, request)
      })
      .then((response: AxiosResponse) => {
        useAssetStore().updateAssetListEntry(response.data)
      })
  },

  async deletePublicHolding(holdingUuid: string) {
    await login('claes', 'pw')
    return getAuthorizedInstance()
        .then((instance) => {
          return instance.delete(`/holding_api/asset_holding/public/${holdingUuid}`)
        })
        .then((response: AxiosResponse) => {

        })
  },

  async deletePrivateHolding(holdingUuid: string) {
    await login('claes', 'pw')
    return getAuthorizedInstance()
        .then((instance) => {
          return instance.delete(`/holding_api/asset_holding/private/${holdingUuid}`)
        })
        .then((response: AxiosResponse) => {

        })
  },
}
