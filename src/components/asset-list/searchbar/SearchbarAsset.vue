<template>
  <RouterLink
    :to="{ name: 'EditAsset', params: { uuid: thisAsset.uuid } }"
    class="searchbar-asset"
    @click="hideModalUnderlay"
  >
    <div class="searchbar-asset-logo"></div>

    <InfoColumn
      :asset-name="thisAsset.assetName"
      :type="thisAsset.assetType"
      :isin="thisAsset.isin"
    />

    <SingleValue
      :asset-uuid="thisAsset.uuid"
      :value-array="priceArray"
      :unit="currency"
    />
  </RouterLink>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { PropType } from 'vue'
import type { IPublicAsset } from '@/models/IPublicAsset'
import { getNewestPriceRecordFormatted } from '@/composables/valueArray'
import { hideModalUnderlay } from '@/composables/modalOverlay'
import { getAssetCurrency } from '@/composables/currency';
import InfoColumn from '../row/column/InfoColumn.vue'
import SingleValue from '../row/column/SingleValue.vue'


const props = defineProps({
  thisAsset: {
    type: Object as PropType<IPublicAsset>,
    required: true,
  },
})

// Get an array that contains the exploded strings of a price record
const priceArray = computed((): string[] => {
  return getNewestPriceRecordFormatted(props.thisAsset.uuid)
})

// Get the currency of the newest price record
const currency = computed((): string => {
  return getAssetCurrency(props.thisAsset.uuid)
})
</script>

<style lang="scss">
@import '@/assets/scss/components/asset/row/_asset-row.scss';
</style>
