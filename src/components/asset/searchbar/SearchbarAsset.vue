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
    }
  },
  setup() {
    const assetStore = useAssetStore()
    return { assetStore }
  },
  methods: {
    priceArray(price: number): string[] {
      return this.assetStore.getValueArray(price)
    },
  },
})
</script>

<style lang="scss">
  @import '@/assets/scss/components/asset/row/_asset-row.scss';
</style>
