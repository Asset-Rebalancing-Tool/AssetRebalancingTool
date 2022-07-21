<template>
  <div v-if="renderContainer" class="asset-container" :class="activeContainer">

    <InfoColumn
        :isSelected="thisAsset.isSelected"
        :name="thisAsset.name"
        :type="thisAsset.type"
        :isin="thisAsset.isin"
    />

    <SingleValue
        :formattedValueArray="thisAsset.formattedStockPrice"
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
        :formattedValueArray="thisAsset.formattedDeviation"
        :unit="this.unit"
    />

  </div>
</template>

<script>

import InfoColumn             from '@/components/tab/asset/row/column/InfoColumn';
import SingleValue            from '@/components/tab/asset/row/column/SingleValue';
import ActualValueColumn      from '@/components/tab/asset/row/column/ActualValueColumn';
import ColumnInput            from '@/components/tab/asset/row/column/ColumnInput';


export default {
  name: 'AssetContainer',
  components: {
    InfoColumn,
    SingleValue,
    ColumnInput,
    ActualValueColumn,
  },
  computed: {
    activeContainer() {
      return (this.thisAsset.isSelected) ? 'selected' : ''
    }
  },
  data() {
    return {
      currency: '€',
      percent: '%',
    }
  },
  props: [
    'thisAsset',
    'renderContainer'
  ]
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
  }

  .asset-container.selected {
    outline: 1px solid var(--main-color);
    box-shadow: var(--box-shaddow-main-color);
  }
</style>