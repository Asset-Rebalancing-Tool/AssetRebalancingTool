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
      :price-records="thisAsset.priceRecords"
      :value-array="priceArray"
      :unit="currency"
    />
  </RouterLink>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { PropType } from 'vue'
import type { IPublicAsset } from '@/models/IPublicAsset'
import { CurrencyEnum } from "@/models/nested/CurrencyEnum";
import { useAssetStore } from '@/stores/AssetStore'
import InfoColumn from '../row/column/InfoColumn.vue'
import SingleValue from '../row/column/SingleValue.vue'
import type {IPriceRecord} from "@/models/nested/IPriceRecord";

const props = defineProps({
  thisAsset: {
    type: Object as PropType<IPublicAsset>,
    required: true,
  },
})



const assetStore = useAssetStore()
const currencyPriceRecordMap = ref(props.thisAsset.currencyPriceRecordMap)

// Get an array that contains the exploded strings of a price record
const priceArray = computed((): string[] => {

  let priceRecords = currencyPriceRecordMap.value[CurrencyEnum.EUR];

  if (priceRecords !== undefined) {
    // Get the first key and access the
    Object.entries(currencyPriceRecordMap.value).forEach(value => {
      priceRecords = value[1]
    })

    const ar = Object.keys(currencyPriceRecordMap.value)

    const key = ar[0] as CurrencyEnum
    priceRecords = currencyPriceRecordMap.value[key]
  }

  return (priceRecords)
    ? assetStore.getValueArray(priceRecords[0].price)
    : ['00', '00', '0']
})

// Get the currency of the newest price record
const currency = computed((): string => {
  const currency = props.thisAsset.currency
  return currency !== null ? assetStore.mapCurrency(currency as CurrencyEnum) : '€'
})

// Hide the modal underlay when focussing the searchbar
const hideModalUnderlay = () => {
  assetStore.activeModalUnderlay = false
}
</script>

<style lang="scss">
@import '@/assets/scss/components/asset/row/_asset-row.scss';
</style>
