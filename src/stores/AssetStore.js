import { defineStore } from 'pinia'

import assets from '@/data/assets.json'

// Register and export the store
export const useAssetStore = defineStore('AssetStore', {

    state: () => {
        return { assets }
    },

    actions: {

        // Toggle the is selected flag of an asset
        // This flag indicates if an asset can be edited, moved, or deleted by the ActionButtons
        // It also causes a visual highlighting of the asset
        toggleIsSelectedFlag(thisAsset) {
            thisAsset.isSelected = (!thisAsset.isSelected);
        },

        // Set the is selected flag of all assets to false
        // This will also lead to a deactivation of the Actionbuttons
        deselectAllAssets() {
            const keys = Object.keys(this.assets);
            keys.forEach((key) => {
                this.assets[key].isSelected = false
            });
        }


    }
})