<template>

  <div v-if="renderGroupContainer" class="asset-group-container">

    <button v-if="isEmptyGroup" class="empty-group-button">+</button>

    <div class="asset-wrapper">
      <AssetContainer
            v-for="asset in thisGroup.assets"
            :key="asset.tickerSymbol"
            :thisAsset="asset"
            :renderContainer="renderGroupContainer"
            @click="toggleIsSelectedFlag(asset)"
      />
    </div>

    <div class="asset-group-footer">
      <p>{{thisGroup.name}}</p>
      <ActualValueColumn :value="totalValue" :percentage="totalPercentage" />
      <DeviationColumn :formattedDeviation="thisGroup.formattedTotalDeviation" :unit="'%'"/>
    </div>
  </div>

  <AssetContainer
      v-for="asset in thisGroup.assets"
      :key="asset.tickerSymbol"
      :thisAsset="asset"
      :renderContainer="renderSingleAsset"
      @click="toggleIsSelectedFlag(asset)"
  />


</template>

<script>
import AssetContainer     from '@/components/tab/asset/row/AssetContainer'
import DeviationColumn    from '@/components/tab/asset/row/column/DeviationColumn';
import ActualValueColumn  from '@/components/tab/asset/row/column/ActualValueColumn';

import {useAssetStore} from '@/stores/AssetStore';


export default {
  name: 'AssetGroup',
  components: {
    AssetContainer,
    DeviationColumn,
    ActualValueColumn
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
    },

    // Returns a bool that indicates if the assets object is empty or not
    isEmptyGroup() {
      return (Object.keys(this.thisGroup.assets).length === 0)
    },

    // The total value of this group
    totalValue() {
      return this.thisGroup.totalValue
    },

    // The total percentage of this group
    totalPercentage() {
      return this.thisGroup.totalPercentage
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

<!-- not scoped -->
<style>
  .asset-group-container {
    width: 100%;
    margin-bottom: 15px;
  }

  .asset-group-container.selected {
    border-radius: var(--primary-border-radius);
    outline: 1px solid var(--main-color);
    outline-offset: -1px;
  }

  .asset-group-container .asset-container.selected {
    outline: none;
    outline-offset: 0;
    box-shadow: none;
  }

  .asset-group-container .asset-container {
    margin-bottom: -1px; /* easier than decreasing the inner borders */
  }

  .asset-wrapper .asset-container:first-child {
    border-radius: var(--primary-border-radius) var(--primary-border-radius) 0 0;
  }

  .asset-wrapper .asset-container:last-child {
    border-radius: 0;
  }

  .asset-group-footer {
    width: 100%;
    height: 45px;
    background-color: var(--tertiary-background-color);
    border-radius: 0 0 var(--primary-border-radius) var(--primary-border-radius);
    display: flex;
    align-items: center;
    column-gap: 50px;
    padding: 0 14px;
  }

  .asset-group-footer p {
    flex: 1;
    color: var(--primary-text-color);
  }

  .asset-group-footer .wrapper {
    width: 80px;
    margin-right: 161px;
  }

  .asset-group-footer .deviation-wrapper {
    margin-top: -2px;
  }

  .group-value {
    color: var(--primary-text-color);
  }

</style>