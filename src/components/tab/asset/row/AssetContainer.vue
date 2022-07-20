<template>
  <div v-if="renderContainer" class="asset-container" :class="activeContainer">

    <InfoColumn
        :isSelected="thisAsset.isSelected"
        :name="thisAsset.name"
        :type="thisAsset.type"
        :isin="thisAsset.isin"
    />

    <PriceColumn
        :formattedStockPrice="thisAsset.formattedStockPrice"
        :currency="thisAsset.currency"
    />

    <SharesColumn
        :shares="thisAsset.shares"
        :sharesType="thisAsset.sharesType"
    />

    <ActualValueColumn
        :actualValue="thisAsset.actualValue"
        :actualPercentage="thisAsset.actualPercentage"
        :currency="thisAsset.currency"
    />

    <TargetPercentageColumn
        :targetPercentage="thisAsset.targetPercentage"
    />

    <DeviationColumn
        :formattedDeviation="thisAsset.formattedDeviation"
    />

  </div>
</template>

<script>

import InfoColumn             from '@/components/tab/asset/row/column/InfoColumn';
import PriceColumn            from '@/components/tab/asset/row/column/PriceColumn';
import SharesColumn           from '@/components/tab/asset/row/column/SharesColumn';
import ActualValueColumn      from '@/components/tab/asset/row/column/ActualValueColumn';
import TargetPercentageColumn from '@/components/tab/asset/row/column/TargetPercentageColumn';
import DeviationColumn        from '@/components/tab/asset/row/column/DeviationColumn';


export default {
  name: 'AssetContainer',
  components: {
    InfoColumn,
    PriceColumn,
    SharesColumn,
    ActualValueColumn,
    TargetPercentageColumn,
    DeviationColumn,
  },
  computed: {
    activeContainer() {
      return (this.thisAsset.isSelected) ? 'selected' : ''
    }
  },
  props: [
    'thisAsset',
    'renderContainer'
  ],
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
    justify-content: space-between;
  }

  .asset-container.selected {
    border: 1px solid var(--main-color);
    box-shadow: var(--box-shaddow-main-color);
  }
</style>