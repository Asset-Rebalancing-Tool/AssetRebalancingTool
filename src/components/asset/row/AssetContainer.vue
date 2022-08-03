<template>
  <div class="asset-container" :class="activeContainer">

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
  name: 'AssetContainer',
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
    activeContainer(): string {
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

<style lang="scss" scoped>
.asset-container {
  width: 100%;
  height: $asset-row-height;
  background-color: $secondary-background-color;
  border: 1px solid $passive-border-color;
  border-radius: $primary-border-radius;
  margin-bottom: 15px;
  padding-right: 10px;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.16);
  display: flex;
  column-gap: 50px;
  cursor: pointer;
}

.asset-container.selected {
  outline: 1px solid $main-color;
  box-shadow: $box-shaddow-main-color;
}
</style>
