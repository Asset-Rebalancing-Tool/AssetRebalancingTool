<template>
  <div
    class="asset-group-footer"
    @click="assetStore.toggleWholeGroupSelectedFlag(props.thisGroup)"
  >
    <p>{{ props.thisGroup.name }}</p>

    <ActualValueColumn :value="totalValue" :percentage="totalPercentage" />

    <ColumnInput
      :inputValue="'90'"
      :unit="'%'"
      @click="$event.stopPropagation()"
    />

    <!-- TODO: Total target percentage in same column as the column input-->

    <SingleValue :arrow="'up'" :valueArray="totalDeviation" :unit="'%'" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useAssetStore } from '@/stores/AssetStore'
import ActualValueColumn from '../row/column/ActualValueColumn.vue'
import ColumnInput from '../row/column/ColumnInput.vue'
import SingleValue from '../row/column/SingleValue.vue'

const assetStore = useAssetStore()

const props = defineProps({
  thisGroup: {
    type: Object,
    required: true,
  },
})

// The total value of this group
const totalValue = computed(() => props.thisGroup.totalValue)

// The total percentage of this group
const totalPercentage = computed(() => props.thisGroup.totalPercentage)

// The total target percentage of this group
/*const totalTargetPercentage = computed(() => {
  return assetStore.getValueArray(props.thisGroup.totalTargetPercentage)
})*/

// The total deviation of this group
const totalDeviation = computed(() => {
  return assetStore.getValueArray(props.thisGroup.totalDeviation)
})
</script>

<!-- not scoped !-->
<style lang="scss">
@import '../../../assets/scss/components/asset/group/asset-group-footer';
</style>
