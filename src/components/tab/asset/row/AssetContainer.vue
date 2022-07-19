<template>
  <div v-if="renderContainer" class="asset-container" :class="activeContainer">

    <InfoColumn
        :isSelected="asset.isSelected"
        :name="asset.name"
        :type="asset.type"
        :isin="asset.isin"
    />

    <PriceColumn
        :formattedStockPrice="asset.formattedStockPrice"
        :currency="asset.currency"
    />

    <SharesColumn
        :shares="asset.shares"
        :sharesType="asset.sharesType"
    />

    <ActualValueColumn
        :actualValue="asset.actualValue"
        :actualPercentage="asset.actualPercentage"
        :currency="asset.currency"
    />

    <TargetPercentageColumn
        :targetPercentage="asset.targetPercentage"
    />

    <DeviationColumn
        :formattedDeviation="asset.formattedDeviation"
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
      return (this.asset.isSelected) ? 'selected' : ''
    }
  },
  props: [
    'asset',
    'renderContainer'
  ],
}
</script>
