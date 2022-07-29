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
         * Toggle the isSelected flag by passing the id of the clicked object
         * and by specifying the name of the list the object is nested in
         *
         * @param id             Integer
         * @param listObjectName String
         */
        toggleIsSelectedFlag(id, listObjectName) {
            const listObject = this.getListObject(listObjectName)
            listObject[id]['isSelected'] = (!listObject[id]['isSelected'])
            this.getSelectedAssetCount()
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
        getSelectedAssetCount() {
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
         * Remove an object by passing its id
         * and specifying the name of the list the object is nested in
         *
         * @param id             Integer
         * @param listObjectName String
         */
        removeById(id, listObjectName) {
            const listObject = this.getListObject(listObjectName)
            for (const [key, asset] of Object.entries(listObject)) {
                if (asset.id === id) {
                    delete listObject[key]
                    break
                }
            }
        },

        /**
         * Remove all selected assets from the asset list object
         */
        removeAllSelectedAssets() {
            const assetListObject = this.getListObject('assetList')
            for (const asset of Object.entries(this.getAllSelectedAssets())) {
                delete assetListObject[asset[1].id]
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