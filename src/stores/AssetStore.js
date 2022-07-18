import { defineStore } from 'pinia'

import assets from '@/data/assets.json'

// Register and export the store
export const useAssetStore = defineStore('AssetStore', {

    state: () => {
        return { assets }
    },
})