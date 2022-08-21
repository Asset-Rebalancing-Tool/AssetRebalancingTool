<template>
  <RouterLink
    :disabled="quickCreate"
    :to="{ name: 'EditAsset', params: { uuid: thisAsset.uuid } }"
    class="searchbar-asset"
    @click="newAssetAction"
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
    >
      <template #graph>
        <LineChart
            v-if="showGraph"
            :data-values="getDataValues(thisAsset.uuid)"
            :data-labels="getDataLabels(thisAsset.uuid)"
            :border-width="'0.8'"
            :background-color="'#19B399'"
            :border-color="'#19B399'"
        />
      </template>
    </SingleValue>
  </RouterLink>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { PropType } from 'vue'
import type { IPublicAsset } from '@/models/IPublicAsset'
import { getNewestPriceRecordFormatted } from '@/composables/valueArray'
import { hideModalUnderlay } from '@/composables/modalOverlay'
import { getAssetCurrency } from '@/composables/currency'
import InfoColumn from '../row/column/InfoColumn.vue'
import SingleValue from '../row/column/SingleValue.vue'
import { useAssetStore } from '@/stores/AssetStore'
import { showGraph, getDataValues, getDataLabels } from '@/composables/smallLineChart';
import LineChart from '@/components/charts/LineChart.vue';

const assetStore = useAssetStore()

// Temporary hardcoded flag
const quickCreate = false

const props = defineProps({
  thisAsset: {
    type: Object as PropType<IPublicAsset>,
    required: true,
  },
})

function newAssetAction(): void {
  // Hide the modal underlay, no matter what creation will be fired
  hideModalUnderlay()
  // If the quick create flag is true, the router link will be disabled and this method will be fired
  if (quickCreate) {
    //assetStore.
  }
}

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
