<template>
  <div class="asset-container" :class="activeContainer">

    <InfoColumn
        :isSelected="thisAsset.isSelected"
        :name="thisAsset.name"
        :type="thisAsset.type"
        :isin="thisAsset.isin"
    />

    <SingleValue
        :valueArray="priceArray"
        :unit="thisAsset.currency"
    />

    <ColumnInput
        :inputValue="thisAsset.shares"
        :unit="'Stk.'"
    />

    <ActualValueColumn
        :value="thisAsset.actualValue"
        :percentage="thisAsset.actualPercentage"
        :currency="thisAsset.currency"
    />

    <ColumnInput
        :inputValue="thisAsset.targetPercentage"
        :unit="'%'"
    />

    <SingleValue
        :valueArray="deviationArray"
        :unit="'%'"
    />

  </div>
</template>

<script>
import InfoColumn             from '@/components/asset/row/column/InfoColumn'
import SingleValue            from '@/components/asset/row/column/SingleValue'
import ActualValueColumn      from '@/components/asset/row/column/ActualValueColumn'
import ColumnInput            from '@/components/asset/row/column/ColumnInput'

import { useAssetStore } from '@/stores/AssetStore'

export default {
  name: 'AssetContainer',
  components: {
    InfoColumn,
    SingleValue,
    ColumnInput,
    ActualValueColumn,
  },
  props: {
    thisAsset: {
      type: Object,
      required: true
    }
  },
  setup() {
    const assetStore = useAssetStore()
    return { assetStore }
  },
  computed: {
    activeContainer() {
      return (this.thisAsset.isSelected) ? 'selected' : ''
    },
    priceArray() {
      return this.assetStore.getValueArray(this.thisAsset.stockPrice)
    },
    deviationArray() {
      return this.assetStore.getValueArray(this.thisAsset.deviation)
    }
  }
}
</script>

<style scoped>
  .asset-container {
    width: 100%;
    height: var(--asset-row-height);
    background-color: var(--secondary-background-color);
    border: 1px solid var(--passive-border-color);
    border-radius: var(--primary-border-radius);
    margin-bottom: 15px;
    padding-right: 10px;
    box-shadow: 3px 3px 6px rgba(0,0,0,0.16);
    display: flex;
    column-gap: 50px;
    cursor: pointer;
  }

  .asset-container.selected {
    outline: 1px solid var(--main-color);
    box-shadow: var(--box-shaddow-main-color);
  }
</style>