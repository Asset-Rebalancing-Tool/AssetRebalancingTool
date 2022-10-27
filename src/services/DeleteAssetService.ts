import { getAuthorizedInstance } from '@/services/TokenService'
import { deleteAssetPoolEntry } from '@/composables/assets/UseAssetPool'
import { deleteRenderListEntry } from '@/composables/assets/UseAssetRenderList'
import type { AxiosInstance } from 'axios'
import { dissolveHoldingGroup } from "@/composables/assets/UseHoldingGroup";

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
      .then(async () => {
        // Remove all holdings from the group and add them to the render list
        await dissolveHoldingGroup(groupUuid)
        // Delete the group pool entry
        deleteAssetPoolEntry(groupUuid)
        // Delete the groups render list entry
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
