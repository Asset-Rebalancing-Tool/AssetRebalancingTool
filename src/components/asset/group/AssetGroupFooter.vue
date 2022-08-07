<template>
  <div
    class="asset-group-footer"
    @click="assetStore.toggleWholeGroupSelectedFlag(thisGroup)"
  >
    <p>{{ thisGroup.name }}</p>

    <ActualValueColumn
        :value="totalValue"
        :percentage="totalPercentage"
    />

    <ColumnInput
        :inputValue="'90'"
        :unit="'%'"
        @click="$event.stopPropagation()"
    />

    <!-- TODO: Total target percentage in same column as the column input-->

    <SingleValue
        :arrow="'up'"
        :valueArray="totalDeviation"
        :unit="'%'"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAssetStore } from '@/stores/AssetStore'
import type { PropType } from 'vue'
import type { IOwnedPrivateGroup } from '@/models/old/IOwnedPrivateGroup'
import ActualValueColumn from '../row/column/ActualValueColumn.vue'
import ColumnInput from '../row/column/ColumnInput.vue'
import SingleValue from '../row/column/SingleValue.vue'

export default defineComponent({
  name: 'AssetGroupFooter',
  components: {
    SingleValue,
    ColumnInput,
    ActualValueColumn,
  },
  props: {
    thisGroup: {
      type: Object as PropType<IOwnedPrivateGroup>,
      required: true,
    },
  },
  computed: {
    // The total value of this group
    totalValue(): number {
      return this.thisGroup.totalValue
    },

    // The total percentage of this group
    totalPercentage(): number {
      return this.thisGroup.totalPercentage
    },

    // The total target percentage of this group
    totalTargetPercentage(): string[] {
      return this.assetStore.getValueArray(this.thisGroup.totalTargetPercentage)
    },

    // The total deviation of this group
    totalDeviation(): string[] {
      return this.assetStore.getValueArray(this.thisGroup.totalDeviation)
    },
  },
  setup() {
    const assetStore = useAssetStore()
    return {
      assetStore,
    }
  },
})
</script>

<!-- not scoped !-->
<style lang="scss">
  @import '../../../assets/scss/components/asset/group/asset-group-footer';
</style>
