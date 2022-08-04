<template>
  <div class="asset-row" :class="selectedAsset">
    <div class="asset-logo"></div>

    <InfoColumn
      :isSelected="thisAsset.isSelected"
      :name="thisAsset.name"
      :type="thisAsset.type"
      :isin="thisAsset.isin"
    />

    <SingleValue
      :graph="thisAsset.graph"
      :valueArray="priceArray"
      :unit="thisAsset.currency"
    />

    <ColumnInput
      :inputValue="thisAsset.shares"
      :unit="'Stk.'"
      @click="$event.stopPropagation()"
    />

    <ActualValueColumn
      :value="thisAsset.actualValue"
      :percentage="thisAsset.actualPercentage"
      :currency="thisAsset.currency"
    />

    <ColumnInput
      :inputValue="thisAsset.targetPercentage"
      :unit="'%'"
      @click="$event.stopPropagation()"
    />

    <SingleValue :arrow="'up'" :valueArray="deviationArray" :unit="'%'" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAssetStore } from '@/stores/AssetStore'
import type { PropType } from 'vue'
import type { IOwnedPublicAsset } from '@/models/IOwnedPublicAsset'
import InfoColumn from './column/InfoColumn.vue'
import SingleValue from './column/SingleValue.vue'
import ActualValueColumn from './column/ActualValueColumn.vue'
import ColumnInput from './column/ColumnInput.vue'

export default defineComponent({
  name: 'AssetRow',
  components: {
    InfoColumn,
    SingleValue,
    ColumnInput,
    ActualValueColumn,
  },
  props: {
    thisAsset: {
      type: Object as PropType<IOwnedPublicAsset>,
      required: true,
    },
  },
  setup() {
    const assetStore = useAssetStore()
    return { assetStore }
  },
  computed: {
    selectedAsset(): string {
      return this.thisAsset.isSelected ? 'selected' : ''
    },
    priceArray(): string[] {
      return this.assetStore.getValueArray(this.thisAsset.stockPrice)
    },
    deviationArray(): string[] {
      return this.assetStore.getValueArray(this.thisAsset.deviation)
    },
  },
})
</script>

<style lang="scss">
@import '@/assets/scss/components/asset/row/_asset-row.scss';
</style>
