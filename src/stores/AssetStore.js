import { defineStore } from 'pinia'

import assets from '@/data/assets.json'

// Register and export the store
export const useAssetStore = defineStore('AssetStore', {

    state: () => {
        return {
            assets,
            actionButtonsAreActive: false
        }
    },

    actions: {

        // Toggle the is selected flag of an asset
        // This flag indicates if an asset can be edited, moved, or deleted by the ActionButtons
        // It also causes a visual highlighting of the asset
        // TODO: use other loop with break option, for performance sake (other loops won't allow this.assets[key] why?)
        toggleIsSelectedFlag(thisAsset) {
            // Toggle the isSelected flag of thisAsset
            thisAsset.isSelected = (!thisAsset.isSelected);
            this.checkActionButtonsFlag()
        },

        // Check if at least one asset has the isSelected flag
        checkActionButtonsFlag() {
            // Always reset the actionButtonsAreActive flag
            this.actionButtonsAreActive = false;
            // Iterate over each asset and set the actionButtonsAreActive flag to true if at least on asset is selected
            const keys = Object.keys(this.assets);
            keys.forEach((key) => {
                if (this.assets[key].isSelected) this.actionButtonsAreActive = true
            });
        },

        // Set the is selected flag of all assets to false
        // This will also lead to a deactivation of the Actionbuttons
        deselectAllAssets() {
            const keys = Object.keys(this.assets);
            keys.forEach((key) => {
                this.assets[key].isSelected = false
            });
            this.actionButtonsAreActive = false
        }


    }
})