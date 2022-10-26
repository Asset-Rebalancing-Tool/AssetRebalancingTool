import { getAuthorizedInstance } from '@/services/TokenService'
import { deleteAssetPoolEntry } from '@/composables/assets/UseAssetPool'
import { deleteRenderListEntry } from '@/composables/assets/UseAssetRenderList'
import type { AxiosInstance } from 'axios'

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
      .then(() => {
        // TODO: other handling that won't delete the public and private holdings
        deleteAssetPoolEntry(groupUuid)
        deleteRenderListEntry(groupUuid)
      })
      .catch((error) => {
        switch (error.response.status) {
          default:
            console.log(
              'DeleteAssetService.ts no status case ' + error.response.status
            )
            break
        }
      })
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
      .then((instance: AxiosInstance) => {
        return instance.delete(
          `/holding_api/asset_holding/public/${holdingUuid}`
        )
      })
      .then(() => {
        deleteAssetPoolEntry(holdingUuid)
        deleteRenderListEntry(holdingUuid)
      })
      .catch((error) => {
        switch (error.response.status) {
          default:
            console.log(
              'DeleteAssetService.ts no status case ' + error.response.status
            )
            break
        }
      })
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
      .then(() => {
        deleteAssetPoolEntry(holdingUuid)
        deleteRenderListEntry(holdingUuid)
      })
      .catch((error) => {
        switch (error.response.status) {
          default:
            console.log(
              'DeleteAssetService.ts no status case ' + error.response.status
            )
            break
        }
      })
  },
}
