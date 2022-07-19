<template>
  <div v-if="renderContainer" class="asset-container" :class="activeContainer">
    <InfoColumn             :asset="asset" />
    <PriceColumn            :asset="asset" />
    <SharesColumn           :asset="asset" />
    <ActualValueColumn      :asset="asset" />
    <TargetPercentageColumn :asset="asset" />
    <DeviationColumn        :asset="asset" />
  </div>
</template>

<script>

import InfoColumn             from '@/components/AssetTab/AssetRow/AssetColumn/InfoColumn';
import PriceColumn            from '@/components/AssetTab/AssetRow/AssetColumn/PriceColumn';
import SharesColumn           from '@/components/AssetTab/AssetRow/AssetColumn/SharesColumn';
import ActualValueColumn      from '@/components/AssetTab/AssetRow/AssetColumn/ActualValueColumn';
import TargetPercentageColumn from '@/components/AssetTab/AssetRow/AssetColumn/TargetPercentageColumn';
import DeviationColumn        from '@/components/AssetTab/AssetRow/AssetColumn/DeviationColumn';


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
