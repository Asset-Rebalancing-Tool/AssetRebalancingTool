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
            groupListObject: reactive(AssetService.fetchGroupList()),
            assetListObject: reactive(AssetService.fetchAssetList()),
            /** Count that is used, to determine what action buttons should be active */
            selectedAssetCount: 0
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
                case 'groupList': return this.groupListObject
                case 'assetList': return this.assetListObject
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
            const assetListObject = this.getListObject('assetList')
            let tempObject = {}
            for (const [key, asset] of Object.entries(assetListObject)) {
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
            const assetListObject = this.getListObject('assetList')
            let tempObject = {}
            for (const [key, asset] of Object.entries(assetListObject)) {
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
            const groupListObject = this.getListObject('groupList')
            const assetListObject = this.getListObject('assetList')
            assetListObject[id]['isSelected'] = (!assetListObject[id]['isSelected'])
            if (relatedGroupId !== null) {
                const thisGroup = groupListObject[relatedGroupId]
                let allSelected = this.checkIfWholeGroupIsSelected(thisGroup, assetListObject)
                if (allSelected) {
                    this.setGroupsSelectedFlag(thisGroup, assetListObject, true)
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
            const assetListObject = this.getListObject('assetList')
            // If all assets of this group are selected, set all to false, if not set all to true
            let allSelected = this.checkIfWholeGroupIsSelected(thisGroup, assetListObject)
            if (allSelected) {
                this.setGroupsSelectedFlag(thisGroup, assetListObject, false)
            } else {
                this.setGroupsSelectedFlag(thisGroup, assetListObject, true)
            }
            // Always set the selected asset count after isSelected flags have been mutated
            this.setSelectedAssetCount();
        },

        /**
         * Check if all assets of a group are selected and return a Boolean based oin that
         *
         * @param thisGroup       Object
         * @param assetListObject Object
         *
         * @returns {boolean} Boolean
         */
        checkIfWholeGroupIsSelected(thisGroup, assetListObject) {
            let allSelected = true
            for (const assetId of thisGroup.relatedAssetsIdArray) {
                if (!assetListObject[assetId].isSelected) {
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
         * @param assetListObject Object
         * @param setTo           Boolean
         */
        setGroupsSelectedFlag(thisGroup, assetListObject, setTo) {
            for (const assetId of thisGroup.relatedAssetsIdArray) {
                assetListObject[assetId].isSelected = setTo
            }
            thisGroup.isSelected = setTo
        },

        /**
         * Return an object of all assets that are selected
         *
         * @returns {{}}
         */
        getAllSelectedAssets () {
            const assetListObject = this.getListObject('assetList')
            let tempObject = {}
            for (const [key, asset] of Object.entries(assetListObject)) {
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
        },

        /**
         * Add an object to its list, by passing the object itself
         * and by specifying the name of the list, the object should be added to
         *
         * @param object         Object
         * @param listObjectName String
         */
        addToListObject(object, listObjectName = 'asset') {
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
            const groupListObject = this.getListObject('groupList')
            const assetListObject = this.getListObject('assetList')
            for (const asset of Object.entries(this.getAllSelectedAssets())) {
                delete assetListObject[asset[1].id]
                for (const group of Object.entries(groupListObject)) {
                    let assetIdArray = group[1].relatedAssetsIdArray
                    let index = assetIdArray.indexOf(asset[1].id);
                    if (index !== -1) {
                        assetIdArray.splice(index, 1);
                    }
                }
            }
        },

        /**
         * Move all selected assets into a group by passing the target group id
         * Deselect all assets after moving
         *
         * @param targetGroupId Integer
         */
        moveAction(targetGroupId) {
            for (const asset of Object.entries(this.getAllSelectedAssets())) {
                asset[1].relatedGroupId = targetGroupId
                asset[1].isSelected = false
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