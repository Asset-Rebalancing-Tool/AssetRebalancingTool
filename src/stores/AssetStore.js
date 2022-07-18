import { defineStore } from 'pinia'

import assets from '@/data/assets.json'

// Register and export the store
export const useAssetStore = defineStore('AssetStore', {

    state: () => {
        return { assets }
    },

    actions: {
        // Select an asset after deselect all other assets
        selectedAsset(thisAsset) {
            const keys = Object.keys(this.assets);
            keys.forEach((key) => {
                this.assets[key].isSelected = false
            });
            thisAsset.isSelected = true
        }
    }
})