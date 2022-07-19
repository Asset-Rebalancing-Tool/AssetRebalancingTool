<template>
  <div
      v-if="render"
      class="asset-container"
      :class="(asset.isSelected) ? 'selected' : ''"
  >
    <AssetInfoColumn             :asset="asset" />
    <AssetPriceColumn            :asset="asset" />
    <AssetSharesColumn           :asset="asset" />
    <AssetActualValueColumn      :asset="asset" />
    <AssetTargetPercentageColumn :asset="asset" />
    <AssetDeviationColumn        :asset="asset" />
  </div>
</template>

<script>

import AssetInfoColumn             from '@/components/AssetTab/AssetRow/AssetColumn/AssetInfoColumn';
import AssetPriceColumn            from '@/components/AssetTab/AssetRow/AssetColumn/AssetPriceColumn';
import AssetSharesColumn           from '@/components/AssetTab/AssetRow/AssetColumn/AssetSharesColumn';
import AssetActualValueColumn      from '@/components/AssetTab/AssetRow/AssetColumn/AssetActualValueColumn';
import AssetTargetPercentageColumn from '@/components/AssetTab/AssetRow/AssetColumn/AssetTargetPercentageColumn';
import AssetDeviationColumn        from '@/components/AssetTab/AssetRow/AssetColumn/AssetDeviationColumn';


export default {
  name: 'AssetContainer',
  components: {
    AssetInfoColumn,
    AssetPriceColumn,
    AssetSharesColumn,
    AssetActualValueColumn,
    AssetTargetPercentageColumn,
    AssetDeviationColumn,
  },
  props: [
    'asset',
    'render'
  ],
}
</script>
