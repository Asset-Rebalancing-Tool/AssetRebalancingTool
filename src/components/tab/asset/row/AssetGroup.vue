<template>

  <div v-if="renderGroupContainer" class="asset-group-container" :class="emptyGroupClass">
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
      <ActualValueColumn
          :value="totalValue"
          :percentage="totalPercentage"
      />
      <SingleValue class="total-target-percentage"
          :valueArray="totalTargetPercentage"
          :unit="'%'"
      />
      <SingleValue
          :valueArray="totalDeviation"
          :unit="'%'"
      />
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
import SingleValue        from '@/components/tab/asset/row/column/SingleValue';
import ActualValueColumn  from '@/components/tab/asset/row/column/ActualValueColumn';

import {useAssetStore} from '@/stores/AssetStore';


export default {
  name: 'AssetGroup',
  components: {
    AssetContainer,
    SingleValue,
    ActualValueColumn
  },
  props: {
    thisGroup: {
      type: Object,
      required: true
    }
  },
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

    emptyGroupClass() {
      return (this.isEmptyGroup) ? 'empty-group' : ''
    },

    // The total value of this group
    totalValue() {
      return this.thisGroup.totalValue
    },

    // The total percentage of this group
    totalPercentage() {
      return this.thisGroup.totalPercentage
    },

    // The total target percentage of this group
    totalTargetPercentage() {
      //console.log(this.thisGroup.totalTargetPercentage)
      return this.assetStore.getValueArray(this.thisGroup.totalTargetPercentage)
    },

    // The total deviation of this group
    totalDeviation() {
      return this.assetStore.getValueArray(this.thisGroup.totalDeviation)
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
    padding-left: 10px;
    padding-right: 11px;
  }

  .asset-group-footer p {
    flex: 1;
    color: var(--primary-text-color);
  }

  .asset-group-footer span {
  }

  /* Because the footer has a smaller height than the assets */
  .asset-group-footer .single-value-wrapper {
    margin-top: -8px;
  }

  .asset-group-footer .actual-value-wrapper {
    margin-right: 12px;
  }

  .group-value {
    color: var(--primary-text-color);
  }

  .total-target-percentage {
    margin-right: 42px;
    margin-left: 10px;
  }

</style>