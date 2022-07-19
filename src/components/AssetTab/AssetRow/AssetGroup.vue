<template>

  <div v-if="thisGroup.groupKey !== 'NONE'">
    <AssetContainer
          v-if="thisGroup.groupKey !== 'NONE'"
          v-for="asset in thisGroup.assets"
          :key="asset.tickerSymbol"
          :asset="asset"
          @click="toggleIsSelectedFlag(asset)"
    />
    <p>{{thisGroup.name}}</p>
  </div>

  <AssetContainer
      v-if="thisGroup.groupKey === 'NONE'"
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
  setup() {
    const assetStore = useAssetStore()
    return {
      assetStore
    }
  },
  methods: {
    toggleIsSelectedFlag(thisAsset) {
      this.assetStore.toggleIsSelectedFlag(thisAsset);
    }
  }
}
</script>
