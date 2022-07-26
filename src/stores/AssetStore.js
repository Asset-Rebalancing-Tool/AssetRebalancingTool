import { defineStore } from 'pinia'
import   AssetService  from '@/services/AssetService';

// Register and export the store
export const useAssetStore = defineStore('AssetStore', {

    state: () => {
        return {
            assetGroups: null,
            actionButtonsAreActive: false
        }
    },

    actions: {

        /**
         * Toggle the is selected flag of an asset
         *
         * This flag indicates if an asset can be edited, moved, or deleted by the ActionButtons
         * It also causes a visual highlighting of the asset
         *
         * TODO: use other loop with break option, for performance sake (other loops won't allow this.assets[key] why?)
         * @param thisAsset
         */
        toggleIsSelectedFlag(thisAsset) {
            // Toggle the isSelected flag of thisAsset
            thisAsset.isSelected = (!thisAsset.isSelected);
            this.checkActionButtonsFlag()
        },

        /**
         * Check if at least one asset has the isSelected flag
         */
        checkActionButtonsFlag() {
            // Always reset the actionButtonsAreActive flag
            this.actionButtonsAreActive = false;
            // Iterate over each asset and set the actionButtonsAreActive flag to true if at least on asset is selected
            const keys = Object.keys(this.assets);
            keys.forEach((key) => {
                if (this.assets[key].isSelected) this.actionButtonsAreActive = true
            });
        },

        /**
         * Set the is selected flag of all assets to false
         * This will also lead to a deactivation of the Actionbuttons
         */
        deselectAllAssets() {
            const keys = Object.keys(this.assets);
            keys.forEach((key) => {
                this.assets[key].isSelected = false
            });
            this.actionButtonsAreActive = false
        },

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
        },
    }
})