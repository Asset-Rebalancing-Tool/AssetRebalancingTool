<template>

  <div v-if="renderGroupContainer">
    <AssetContainer
          v-if="renderGroupContainer"
          v-for="asset in thisGroup.assets"
          :key="asset.tickerSymbol"
          :asset="asset"
          @click="toggleIsSelectedFlag(asset)"
    />
    <p>{{thisGroup.name}}</p>
  </div>

  <AssetContainer
      v-if="renderSingleAsset"
      v-for="asset in thisGroup.assets"
      :key="asset.tickerSymbol"
      :asset="asset"
      @click="toggleIsSelectedFlag(asset)"
  />

</template>

<script>
import AssetContainer  from '@/components/AssetTab/AssetRow/AssetContainer'
import {useAssetStore} from '@/stores/AssetStore';

export default {
  name: 'AssetGroup',
  components: {
    AssetContainer
  },
  props: [
    'thisGroup',
  ],
  computed: {
    // Returns a bool that indicates if the whole group container should be rendered
    renderGroupContainer() {
      return (thisGroup.groupKey !== 'NONE')
    },

    // Returns a bool that indicates if only the single assets should be rendered
    renderSingleAsset() {
      return (thisGroup.groupKey === 'NONE')
    }
  },
  setup() {
    const assetStore = useAssetStore()
    return {
      assetStore
    }
  },
  methods: {
    // Mutate the is selected flag of an asset from the asset store
    toggleIsSelectedFlag(thisAsset) {
      this.assetStore.toggleIsSelectedFlag(thisAsset);
    }
  }
}
</script>
