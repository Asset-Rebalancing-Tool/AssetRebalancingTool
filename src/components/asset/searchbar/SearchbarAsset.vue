<template>
  <div class="searchbar-asset">
    <div class="searchbar-asset-logo"></div>

    <InfoColumn
      :asset-name="thisAsset.assetName"
      :type="thisAsset.assetType"
      :isin="thisAsset.isin"
    />

    <SingleValue
        :price-records="thisAsset.priceRecords"
        :value-array="priceArray"
        :unit="currency"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { PropType, Ref } from 'vue'
import type { IPublicAsset } from '@/models/IPublicAsset'
import type { IPriceRecord } from '@/models/nested/IPriceRecord'
import { useAssetStore } from '@/stores/AssetStore'
import InfoColumn from '../row/column/InfoColumn.vue'
import SingleValue from '../row/column/SingleValue.vue'

const props = defineProps({
  thisAsset: {
    type: Object as PropType<IPublicAsset>,
    required: true,
  },
})

const assetStore = useAssetStore()
const priceRecordsArray: IPriceRecord[] = props.thisAsset.priceRecords

// Get an array that contains the exploded strings of a price record
const priceArray = computed((): string[] => {
  const newestPrice =
    priceRecordsArray.length === 0 ? null : priceRecordsArray[0].price

  return newestPrice !== null
    ? assetStore.getValueArray(newestPrice)
    : ['00', '00', '0']
})

// Get the currency of the newest price record
const currency = computed((): string => {
  const currency =
    priceRecordsArray.length === 0 ? null : priceRecordsArray[0].currency

  return currency !== null ? assetStore.mapCurrency(currency) : '€'
})
</script>

<style lang="scss">
@import '@/assets/scss/components/asset/row/_asset-row.scss';
</style>
