<template>
  <div class="searchbar-asset">
    <div class="searchbar-asset-logo"></div>

    <InfoColumn
      :name="thisAsset.assetName"
      :type="thisAsset.assetType"
      :isin="thisAsset.isin"
    />

    <SingleValue
      :valueArray="priceArray(thisAsset.priceRecords[0].price)"
      :unit="thisAsset.priceRecords[0].Currency"
    />
  </div>
</template>

<script lang="ts" setup>
import { useAssetStore } from '@/stores/AssetStore'
import InfoColumn from '../row/column/InfoColumn.vue'
import SingleValue from '../row/column/SingleValue.vue'

const assetStore = useAssetStore()

const props = defineProps({
  thisAsset: {
    type: Object,
    required: true,
  }
})

// Get an array that contains the exploded strings of a price record
const priceArray = (price: number): string[] => {
  return assetStore.getValueArray(price)
}
</script>

<style lang="scss">
  @import '@/assets/scss/components/asset/row/_asset-row.scss';
</style>
