import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { IOwnedPrivateGroups } from '@/models/old/IOwnedPrivateGroups'
import type { IOwnedPrivateGroup } from '@/models/old/IOwnedPrivateGroup'
import type { IOwnedPublicAssets } from '@/models/old/IOwnedPublicAssets'
import type { IOwnedPublicAsset } from '@/models/old/IOwnedPublicAsset'
import AssetService from '@/services/AssetService'

/***********************************************************************************/
/* --------------------------------- Asset Store ----------------------------------*/
/***********************************************************************************/

export type RootState = {
  ownedGroups: IOwnedPrivateGroups
  ownedAssets: IOwnedPublicAssets
  selectedAssetCount: number
  showGroupWrapper: boolean
  activeModalUnderlay: boolean
}

export const useAssetStore = defineStore('assetStore', {
  state: () =>
    ({
      /** Reactive list objects */
      ownedGroups: reactive(AssetService.fetchOwnedGroups()),
      ownedAssets: reactive(AssetService.fetchOwnedAssets()),
      /** Count that is used, to determine what action buttons should be active */
      selectedAssetCount: 0,
      showGroupWrapper: false,
      activeModalUnderlay: false,
      request: null,
    } as RootState),

  actions: {
    /**
     * Return an object of all assets that are related to a specific group
     *
     * @param uuid String
     *
     * @returns {{}}
     */
    getAssetsByGroupUuid(uuid: string): IOwnedPublicAssets {
      const tempObject: IOwnedPublicAssets = {}
      const ownedAssets: IOwnedPublicAssets = this.ownedAssets
      for (const [key, asset] of Object.entries(ownedAssets)) {
        if (asset.relatedGroupUuid === uuid.toString()) {
          tempObject[key] = asset
        }
      }
      return tempObject
    },

    /**
     * Return an object of all assets that does not have a related group
     *
     * @returns {{}}
     */
    getAssetsWithoutGroup(): IOwnedPublicAssets {
      const tempObject: IOwnedPublicAssets = {}
      for (const [key, asset] of Object.entries(this.ownedAssets)) {
        if (asset.relatedGroupUuid === null) {
          tempObject[key] = asset
        }
      }
      return tempObject
    },

    /**
     * Toggle the isSelected flag of an asset by passing the uuid of the clicked object
     * Also pass the related group uuid in order to check if the whole group is selected after the click
     * and therefore should be selected also
     *
     * @param uuid             Integer
     * @param relatedGroupUuid Integer
     */
    toggleIsSelectedFlag(uuid: string, relatedGroupUuid: number): void {
      const ownedGroups: IOwnedPrivateGroups = this.ownedGroups
      const ownedAssets: IOwnedPublicAssets = this.ownedAssets
      ownedAssets[uuid]['isSelected'] = !ownedAssets[uuid]['isSelected']
      if (relatedGroupUuid !== null) {
        const thisGroup = ownedGroups[relatedGroupUuid]
        const allSelected = this.checkIfWholeGroupIsSelected(
          thisGroup,
          ownedAssets
        )
        if (allSelected) {
          this.setGroupsSelectedFlag(thisGroup, ownedAssets, true)
        } else {
          thisGroup.isSelected = false
        }
      }
      this.setSelectedAssetCount()
    },

    /**
     * Toggle the isSelect flags of each asset along with their related group
     * If not all assets are selected, set them all to true
     * If all assets are already selected, set them all to false
     *
     * @param thisGroup IOwnedPrivateGroup
     */
    toggleWholeGroupSelectedFlag(thisGroup: IOwnedPrivateGroup): void {
      const ownedAssets: IOwnedPublicAssets = this.ownedAssets
      // If all assets of this group are selected, set all to false, if not set all to true
      const allSelected: boolean = this.checkIfWholeGroupIsSelected(
        thisGroup,
        ownedAssets
      )
      if (allSelected) {
        this.setGroupsSelectedFlag(thisGroup, ownedAssets, false)
      } else {
        this.setGroupsSelectedFlag(thisGroup, ownedAssets, true)
      }
      // Always set the selected asset count after isSelected flags have been mutated
      this.setSelectedAssetCount()
    },

    /**
     * Check if all assets of a group are selected and return a Boolean based oin that
     *
     * @param thisGroup   IOwnedPrivateGroups
     * @param ownedAssets IOwnedPublicAssets
     *
     * @returns {boolean} Boolean
     */
    checkIfWholeGroupIsSelected(
      thisGroup: IOwnedPrivateGroup,
      ownedAssets: IOwnedPublicAssets
    ): boolean {
      let allSelected = true
      for (const assetId of thisGroup.relatedAssetsUuidArray) {
        if (!ownedAssets[assetId].isSelected) {
          allSelected = false
        }
      }
      return allSelected
    },

    /**
     * Set all group assets isSelect flags along with the groups isSelected flag itself,
     * by specifying to what Boolean the flag should be set
     *
     * @param thisGroup   IOwnedPrivateGroups
     * @param ownedAssets IOwnedPublicAssets
     * @param setTo       Boolean
     */
    setGroupsSelectedFlag(
      thisGroup: IOwnedPrivateGroup,
      ownedAssets: IOwnedPublicAssets,
      setTo: boolean
    ): void {
      for (const assetId of thisGroup.relatedAssetsUuidArray) {
        ownedAssets[assetId].isSelected = setTo
      }
      thisGroup.isSelected = setTo
    },

    /**
     * Return an object of all assets that are selected
     *
     * @returns {{}}
     */
    getAllSelectedAssets(): IOwnedPublicAssets {
      const ownedAssets: IOwnedPublicAssets = this.ownedAssets
      const tempObject = {} as IOwnedPublicAssets
      for (const [key, asset] of Object.entries(ownedAssets)) {
        if (asset.isSelected) {
          tempObject[key] = asset
        }
      }
      return tempObject
    },

    /**
     * Returns the length of the selected asset object
     * This is needed to decide what action buttons should be rendered
     */
    setSelectedAssetCount(): void {
      this.selectedAssetCount = Object.keys(this.getAllSelectedAssets()).length
      if (this.selectedAssetCount === 0) this.showGroupWrapper = false
    },

    /**
     * Add a group to the owned groups, by passing the group object
     *
     * @param thisGroup IOwnedPrivateGroups
     */
    addToOwnedGroups(thisGroup: IOwnedPrivateGroup): void {
      const newId = '0' //uuidv4()
      thisGroup.uuid = newId
      this.ownedGroups[newId] = thisGroup
    },

    /**
     * Add an asset to the owned assets, by passing the asset object
     *
     * @param thisAsset IOwnedPublicAssets
     */
    addToOwnedAssets(thisAsset: IOwnedPublicAsset): void {
      const newId = '0' //uuidv4()
      thisAsset.uuid = newId
      this.ownedAssets[newId] = thisAsset
    },

    /**
     * Remove all selected assets from the asset list object
     * and remove the uuid's of those assets from each groups relatedAssetsUuidArray
     * TODO: popup message for safety reasons along with selection if group should be also deleted if there is a whole group selected
     */
    removeAllSelectedAssets(): void {
      const ownedAssets: IOwnedPublicAssets = this.ownedAssets
      for (const [key, thisAsset] of Object.entries(
        this.getAllSelectedAssets()
      )) {
        delete ownedAssets[key]
        // Check for each group if this asset is listed in that group
        this.removeAssetsFromGroup(thisAsset)
      }
    },

    /**
     * Move all selected assets into a group by passing the target group uuid
     * Deselect all assets after moving
     *
     * @param targetGroupId Integer
     */
    moveAction(targetGroupId: string): void {
      for (const thisAsset of Object.entries(this.getAllSelectedAssets())) {
        thisAsset[1].relatedGroupUuid =
          typeof targetGroupId !== 'undefined' ? targetGroupId : null
        thisAsset[1].isSelected = false
        // Check for each group if this asset is listed in that group
        this.removeAssetsFromGroup(thisAsset[1])
      }
    },

    /**
     * Iterate over each group from the group list object and check,
     * if the passed asset is in the groups relatedAssetsUuidArray, if so remove it
     *
     * @param thisAsset IOwnedPublicAssets
     */
    removeAssetsFromGroup(thisAsset: IOwnedPublicAsset): void {
      const ownedGroups: IOwnedPrivateGroups = this.ownedGroups
      for (const group of Object.entries(ownedGroups)) {
        const assetIdArray: string[] = group[1].relatedAssetsUuidArray
        const index: number = assetIdArray.indexOf(thisAsset.uuid)
        if (index !== -1) {
          assetIdArray.splice(index, 1)
        }
      }
    },

    /**
     * Take a value and explode it into an array that can be used to access the single values
     *
     * @param assetValue
     *
     * @returns {string[]}
     */
    getValueArray(assetValue: number): string[] {
      // Parse the value of the asset to string
      const valueString: string = assetValue.toString()

      // create the value array by splitting the float
      const valueArray: string[] = valueString.split('.')

      let firstDigit    = valueArray[0]
      let firstDecimal  = valueArray[1]
      let secondDecimal = ''

      // If the first decimal is only one character long, add a zero to its end
      if (firstDecimal.length === 1) {
        firstDecimal = firstDecimal + '0'
      }

      // If the first decimal is greater than two characters, split it
      if (firstDecimal.length > 2) {
        secondDecimal = firstDecimal.slice(2, 3)
        firstDecimal = firstDecimal.slice(0, 2)
      }

      return [firstDigit, firstDecimal, secondDecimal]
    },
  },
})
