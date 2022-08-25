<template>
  <section id="edit-asset">
    <BreadcrumbNavigation />
    <div class="card-wrapper">
      <CardWrapper :header-text="'Live Daten'">
        <template #content>
          <div class="live-data-header">
            <div class="asset-logo"></div>
            <InfoColumn
              :asset-name="asset.assetName"
              :type="asset.assetType"
              :isin="asset.isin"
            />
            <SingleValue :value-array="priceArray" :unit="currency" />
          </div>
        </template>
      </CardWrapper>

      <CardWrapper :header-text="'Asset hinzufügen'">
        <template #content> </template>
      </CardWrapper>
    </div>
  </section>
</template>

<script lang="ts" setup>
/*import BreadcrumbNavigation from '@/components/edit-asset/BreadcrumbNavigation.vue'
import CardWrapper from '@/components/edit-asset/CardWrapper.vue'
import InfoColumn from '@/components/asset-list/row/column/InfoColumn.vue'
import SingleValue from '@/components/asset-list/row/column/SingleValue.vue'
import { useAssetStore } from '@/stores/AssetStore'
import { computed } from 'vue';
import type { IPublicAsset } from '@/models/IPublicAsset'
import { getNewestPriceRecordFormatted } from '@/composables/valueArray'
import { mapAssetCurrencyByUuid } from '@/composables/currency'

const assetStore = useAssetStore()

const props = defineProps({
  uuid: {
    type: String,
    required: true,
  }
})

// Get the asset from the asset stores searchbar asset array based on the passed uuid
const asset = computed<IPublicAsset>(() => {
  return assetStore.getSearchbarAsset(props.uuid)
})

// Get an array that contains the exploded strings of a price record
const priceArray = computed((): string[] => {
  return getNewestPriceRecordFormatted(props.uuid)
})

// Get the currency of the newest price record
const currency = computed((): string => {
  return mapAssetCurrencyByUuid(props.uuid)
})*/
</script>

<style lang="scss">
/*@import "src/assets/scss/components/asset/row/column/info-column.scss";
@import "src/assets/scss/components/asset/row/column/single-value-column.scss";
@import 'src/assets/scss/views/_edit-asset';*/
</style>
