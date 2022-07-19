<template>

  <div v-if="renderGroupContainer" class="asset-group-container">
    <AssetContainer
          v-for="asset in thisGroup.assets"
          :key="asset.tickerSymbol"
          :asset="asset"
          :renderContainer="renderGroupContainer"
          @click="toggleIsSelectedFlag(asset)"
    />
    <div class="asset-group-footer">
      <p>{{thisGroup.name}}</p>
      <ActualValueColumn
          :actual-value="thisGroup.totalValue"
          :actual-percentage="thisGroup.totalPercentage"
          :currency="thisGroup.currency"
      />
      <DeviationColumn :formattedDeviation="thisGroup.formattedTotalDeviation"/>
    </div>
  </div>

  <AssetContainer
      v-for="asset in thisGroup.assets"
      :key="asset.tickerSymbol"
      :asset="asset"
      :renderContainer="renderSingleAsset"
      @click="toggleIsSelectedFlag(asset)"
  />

</template>

<script>
import AssetContainer     from '@/components/tab/asset/row/AssetContainer'
import ActualValueColumn  from '@/components/tab/asset/row/column/ActualValueColumn'
import DeviationColumn    from '@/components/tab/asset/row/column/DeviationColumn';

import {useAssetStore} from '@/stores/AssetStore';


export default {
  name: 'AssetGroup',
  components: {
    AssetContainer,
    ActualValueColumn,
    DeviationColumn,
  },
  props: [
    'thisGroup',
  ],
  computed: {
    // Returns a bool that indicates if the whole group container should be rendered
    renderGroupContainer() {
      return (this.thisGroup.groupKey !== 'NONE')
    },

    // Returns a bool that indicates if only the single assets should be rendered
    renderSingleAsset() {
      return (this.thisGroup.groupKey === 'NONE')
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
