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
            <SingleValue
                :price-records="asset.priceRecords"
                :value-array="valueArray"
                :unit="currency"
            >
              <template #graph>
                <LineChart
                    v-if="showGraph"
                    :data-values="dataValues"
                    :data-labels="dataLabels"
                    :border-width="'0.8'"
                    :background-color="'#19B399'"
                    :border-color="'#19B399'"
                />
              </template>
            </SingleValue>
          </div>


        </template>
      </CardWrapper>

      <CardWrapper :header-text="'Asset hinzufügen'">
        <template #content>

        </template>
      </CardWrapper>

    </div>
  </section>
</template>

<script lang="ts" setup>
import BreadcrumbNavigation from '@/components/edit-asset/BreadcrumbNavigation.vue'
import CardWrapper from '@/components/edit-asset/CardWrapper.vue'
import InfoColumn from '@/components/asset-list/row/column/InfoColumn.vue';
import LineChart from '@/components/charts/LineChart.vue'
import SingleValue from '@/components/asset-list/row/column/SingleValue.vue';
import { useAssetStore } from '@/stores/AssetStore';
import { computed } from 'vue';
import type { IPublicAsset } from '@/models/IPublicAsset';
import type { IPriceRecord } from '@/models/nested/IPriceRecord';
import { useValueArray } from '@/composables/valueArray';

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

const valueArray = useValueArray(props.uuid).valueArray



const showGraph = computed(() => {
  return props.priceRecords.length > 0
})


const dataValues = computed((): number[] => {
  const dataValues: number[] = []
  if (props.priceRecords) {
    for (const item of props.priceRecords) {
      const record = item as IPriceRecord
      dataValues.push(record.price)
    }
  }
  return dataValues
})

const dataLabels = computed((): string[] => {
  const dataLabels: string[] = []
  if (props.priceRecords) {
    for (const item of props.priceRecords) {
      const record = item as IPriceRecord
      dataLabels.push(record.tsPrice)
    }
  }
  return dataLabels
})
</script>

<style lang="scss">
@import "src/assets/scss/components/asset/row/column/info-column.scss";
@import 'src/assets/scss/views/_edit-asset';
</style>
