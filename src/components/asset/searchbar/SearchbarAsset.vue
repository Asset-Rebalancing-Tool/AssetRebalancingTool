<template>
  <div class="searchbar-asset">
    <div class="searchbar-asset-logo"></div>

    <InfoColumn
      :name="props.thisAsset.assetName"
      :type="props.thisAsset.assetType"
      :isin="props.thisAsset.isin"
    />

    <SingleValue
      :valueArray="priceArray(thisAsset.priceRecords[0].price)"
      :unit="props.thisAsset.priceRecords[0].currency"
    />
  </div>
</template>

<script lang="ts" setup>
import { PropType, defineProps } from "vue";
import { IPublicAsset } from "@/models/IPublicAsset";
import { useAssetStore } from '@/stores/AssetStore'
import InfoColumn from '../row/column/InfoColumn.vue'
import SingleValue from '../row/column/SingleValue.vue'

const props = defineProps({
  thisAsset: {
    type: Object as PropType<IPublicAsset>,
    required: true,
  },
})

// Get an array that contains the exploded strings of a price record
const assetStore = useAssetStore()
const priceArray = (price: number): string[] => {
  return assetStore.getValueArray(price)
}
</script>

<style lang="scss">
@import '@/assets/scss/components/asset/row/_asset-row.scss';
</style>
