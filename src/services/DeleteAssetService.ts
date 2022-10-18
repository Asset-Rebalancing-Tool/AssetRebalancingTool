import {
  getAuthorizedInstance,
  handleErrorResponseStatus,
} from '@/services/TokenService'
import { removeAssetPoolEntry } from '@/composables/UseAssetPool'

export default {
  /**
   * Delete a holding group
   *
   * @param groupUuid string
   *
   * @return Promise<void>
   */
  async deleteHoldingGroup(groupUuid: string): Promise<void> {
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.delete(`/holding_api/asset_holding/group/${groupUuid}`)
      })
      .then(() => removeAssetPoolEntry(groupUuid))
      .catch((error) => handleErrorResponseStatus(error))
  },

  /**
   * Delete a public holding
   *
   * @param holdingUuid string
   *
   * @return Promise<void>
   */
  async deletePublicHolding(holdingUuid: string): Promise<void> {
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.delete(
          `/holding_api/asset_holding/public/${holdingUuid}`
        )
      })
      .then(() => removeAssetPoolEntry(holdingUuid))
      .catch((error) => handleErrorResponseStatus(error))
  },

  /**
   * Delete a private holding
   *
   * @param holdingUuid string
   *
   * @return Promise<void>
   */
  async deletePrivateHolding(holdingUuid: string): Promise<void> {
    return getAuthorizedInstance()
      .then((instance) => {
        return instance.delete(
          `/holding_api/asset_holding/private/${holdingUuid}`
        )
      })
      .then(() => removeAssetPoolEntry(holdingUuid))
      .catch((error) => handleErrorResponseStatus(error))
  },
}
