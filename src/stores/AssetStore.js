import { defineStore } from 'pinia'
import { reactive } from 'vue'
import AssetService from '@/services/AssetService'

/***********************************************************************************/
/* --------------------------------- Asset Store ----------------------------------*/
/***********************************************************************************/

export const useAssetStore = defineStore('assetStore', {

    state: () => {
        return {
            /** Reactive list objects */
            listOfGroups: reactive(AssetService.fetchGroupList()),
            listOfAssets: reactive(AssetService.fetchAssetList()),
            /** Count that is used, to determine what action buttons should be active */
            selectedAssetCount: 0,
            showGroupWrapper: false,
            activeModalUnderlay: false
        }
    },

    actions: {

        /**
         * Determine what list object should be returned
         * and therefore be used in the context of an asset store action
         *
         * @param listObjectName String
         *
         * @returns {*}
         */
        getListObject(listObjectName) {
            switch (listObjectName) {
                case 'groupList': return this.listOfGroups
                case 'assetList': return this.listOfAssets
            }
        },

        /**
         * Return an object of all assets that are related to a specific group
         *
         * @param id Integer
         *
         * @returns {{}}
         */
        getAssetsByGroupId(id) {
            const listOfAssets = this.getListObject('assetList')
            let tempObject = {}
            for (const [key, asset] of Object.entries(listOfAssets)) {
                if (asset.relatedGroupId === id) {
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
        getAssetsWithoutGroup() {
            const listOfAssets = this.getListObject('assetList')
            let tempObject = {}
            for (const [key, asset] of Object.entries(listOfAssets)) {
                if (asset.relatedGroupId === null) {
                    tempObject[key] = asset
                }
            }
            return tempObject
        },

        /**
         * Toggle the isSelected flag of an asset by passing the id of the clicked object
         * Also pass the related group id in order to check if the whole group is selected after the click
         * and therefore should be selected also
         *
         * @param id             Integer
         * @param relatedGroupId Integer
         */
        toggleIsSelectedFlag(id, relatedGroupId) {
            const listOfGroups = this.getListObject('groupList')
            const listOfAssets = this.getListObject('assetList')
            listOfAssets[id]['isSelected'] = (!listOfAssets[id]['isSelected'])
            if (relatedGroupId !== null) {
                const thisGroup = listOfGroups[relatedGroupId]
                let allSelected = this.checkIfWholeGroupIsSelected(thisGroup, listOfAssets)
                if (allSelected) {
                    this.setGroupsSelectedFlag(thisGroup, listOfAssets, true)
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
         * @param thisGroup Object
         */
        toggleWholeGroupSelectedFlag(thisGroup) {
            const listOfAssets = this.getListObject('assetList')
            // If all assets of this group are selected, set all to false, if not set all to true
            let allSelected = this.checkIfWholeGroupIsSelected(thisGroup, listOfAssets)
            if (allSelected) {
                this.setGroupsSelectedFlag(thisGroup, listOfAssets, false)
            } else {
                this.setGroupsSelectedFlag(thisGroup, listOfAssets, true)
            }
            // Always set the selected asset count after isSelected flags have been mutated
            this.setSelectedAssetCount();
        },

        /**
         * Check if all assets of a group are selected and return a Boolean based oin that
         *
         * @param thisGroup       Object
         * @param listOfAssets Object
         *
         * @returns {boolean} Boolean
         */
        checkIfWholeGroupIsSelected(thisGroup, listOfAssets) {
            let allSelected = true
            for (const assetId of thisGroup.relatedAssetsIdArray) {
                if (!listOfAssets[assetId].isSelected) {
                    allSelected = false
                }
            }
            return allSelected
        },

        /**
         * Set all group assets isSelect flags along with the groups isSelected flag itself,
         * by specifying to what Boolean the flag should be set
         *
         * @param thisGroup       Object
         * @param listOfAssets Object
         * @param setTo           Boolean
         */
        setGroupsSelectedFlag(thisGroup, listOfAssets, setTo) {
            for (const assetId of thisGroup.relatedAssetsIdArray) {
                listOfAssets[assetId].isSelected = setTo
            }
            thisGroup.isSelected = setTo
        },

        /**
         * Return an object of all assets that are selected
         *
         * @returns {{}}
         */
        getAllSelectedAssets () {
            const listOfAssets = this.getListObject('assetList')
            let tempObject = {}
            for (const [key, asset] of Object.entries(listOfAssets)) {
                if (asset.isSelected) {
                    tempObject[key] = asset
                }
            }
            return tempObject
        },

        /**
         * Returns the length of the selected asset object
         * This is needed to decide what action buttons should be rendered
         *
         * @returns {number} Integer
         */
        setSelectedAssetCount() {
            this.selectedAssetCount = Object.keys(this.getAllSelectedAssets()).length
            if (this.selectedAssetCount === 0) this.showGroupWrapper = false
        },

        /**
         * Add an object to its list, by passing the object itself
         * and by specifying the name of the list, the object should be added to
         *
         * @param object         Object
         * @param listObjectName String
         */
        addToListObject(object, listObjectName = 'assetList') {
            const newId = this.generateRandomId(listObjectName)
            const listObject = this.getListObject(listObjectName)
            object.id = newId
            listObject[newId] = object
        },

        /**
         * Remove all selected assets from the asset list object
         * and remove the id's of those assets from each groups relatedAssetsIdArray
         * TODO: popup message for safety reasons along with selection if group should be also deleted if there is a whole group selected
         */
        removeAllSelectedAssets() {
            const listOfGroups = this.getListObject('groupList')
            const listOfAssets = this.getListObject('assetList')
            for (const asset of Object.entries(this.getAllSelectedAssets())) {
                delete listOfAssets[asset[1].id]
                // Check for each group if this asset is listed in that group
                this.removeAssetsFromGroup(listOfGroups, asset)
            }
        },

        /**
         * Move all selected assets into a group by passing the target group id
         * Deselect all assets after moving
         *
         * @param targetGroupId Integer
         */
        moveAction(targetGroupId) {
            const listOfGroups = this.getListObject('groupList')
            for (const asset of Object.entries(this.getAllSelectedAssets())) {
                asset[1].relatedGroupId = (typeof targetGroupId !== 'undefined') ? targetGroupId : null
                asset[1].isSelected = false
                // Check for each group if this asset is listed in that group
                this.removeAssetsFromGroup(listOfGroups, asset)
            }
        },

        /**
         * Iterate over each group from the group list object and check,
         * if the passed asset is in the groups relatedAssetsIdArray, if so remove it
         *
         * @param listOfGroups Object
         * @param asset           Object
         */
        removeAssetsFromGroup(listOfGroups, asset) {
            for (const group of Object.entries(listOfGroups)) {
                let assetIdArray = group[1].relatedAssetsIdArray
                let index = assetIdArray.indexOf(asset[1].id);
                if (index !== -1) {
                    assetIdArray.splice(index, 1);
                }
            }
        },

        /**
         * Generate a random id that is not already in use
         *
         * @param listObjectName
         *
         * @returns {*} Integer
         */
        generateRandomId(listObjectName) {
            const listObject = this.getListObject(listObjectName)
            const isTrue = true
            while (isTrue) {
                let randomId = this.getRandomInt(1000, 9999)
                if (listObject[randomId] === undefined) {
                    return randomId
                }
            }
        },

        /**
         * Generate a random Integer between the range of 1000 and 9999
         *
         * @param min Integer
         * @param max Integer
         *
         * @returns {number} Integer
         */
        getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        },

        /**
         * Take a value and explode it into an array that can be used to access the single values
         *
         * @param assetValue
         *
         * @returns {string[]}
         */
        getValueArray(assetValue) {
            // Parse the value of the asset to string
            let valueString = parseFloat(assetValue).toString()

            // create the value array by splitting the float
            let valueArray = valueString.split('.')

            // Add zeros to the value string, if it is only one digit long
            if (valueArray.length === 1) {
                valueArray[1] = '0'
                valueArray[2] = '0'
            } else if (valueArray.length === 2) {
                valueArray[2] = '0'
            }

            // If the first value is smaller than two digit add a zero as first character (visual purpose)
            valueArray[0] = (valueArray[0].length < 2)
                ? '0' + valueArray[0]
                : valueArray[0]

            // If the first value is smaller than two digit add a zero as first character (visual purpose)
            valueArray[2] = (valueArray[1].length > 2)
                ? valueArray[1].substring(2)
                : '0'

            valueArray[1] = (valueArray[1].substring(0,2)).toString()

            return valueArray
        }
    },
})