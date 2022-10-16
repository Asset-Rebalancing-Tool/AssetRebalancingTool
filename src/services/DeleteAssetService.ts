import { getAuthorizedInstance, handleErrorResponseStatus } from "@/services/TokenService";
import { removeAssetMapEntry } from "@/composables/UseAssetMap";

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
                return instance.delete(
                    `/holding_api/asset_holding/group/${groupUuid}`
                )
            })
            .then(() => removeAssetMapEntry(groupUuid))
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
            .then(() => removeAssetMapEntry(holdingUuid))
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
            .then(() => removeAssetMapEntry(holdingUuid))
            .catch((error) => handleErrorResponseStatus(error))
    }

}
