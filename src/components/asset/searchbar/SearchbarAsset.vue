<template>
  <div class="searchbar-asset" :class="selectedAsset">
    <div class="searchbar-asset-logo"></div>

    <InfoColumn
      :name="thisAsset.name"
      :type="thisAsset.type"
      :isin="thisAsset.isin"
    />

    <SingleValue
      :graph="thisAsset.graph"
      :valueArray="priceArray"
      :unit="thisAsset.currency"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAssetStore } from '@/stores/AssetStore'
import type { PropType } from 'vue'
import type { IOwnedPublicAsset } from '@/models/old/IOwnedPublicAsset'
import InfoColumn from '../row/column/InfoColumn.vue'
import SingleValue from '../row/column/SingleValue.vue'

export default defineComponent({
  name: 'AssetRow',
  components: {
    InfoColumn,
    SingleValue
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
