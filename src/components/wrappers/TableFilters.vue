<template>
  <div class="filter-container">
    <div class="table-filter">
      <span class="column info">
        <span @click="sort(SortColumn.ASSET_NAME)">
          {{ $t('assetList.tableFilters.assetName') }}
          <IconFilterArrow
            :is-selected="selectedColumn === SortColumn.ASSET_NAME"
            :is-asc="isAsc"
          />
        </span>
      </span>
      <span class="column">
        <span @click="sort(SortColumn.PRICE)">
          {{ $t('assetList.tableFilters.price') }}
          <IconFilterArrow
            :is-selected="selectedColumn === SortColumn.PRICE"
            :is-asc="isAsc"
          />
        </span>
      </span>
      <span class="column">
        <span @click="sort(SortColumn.OWNED_QUANTITY)">
          {{ $t('assetList.tableFilters.ownedQuantity') }}
          <IconFilterArrow
            :is-selected="selectedColumn === SortColumn.OWNED_QUANTITY"
            :is-asc="isAsc"
          />
        </span>
      </span>
      <span class="column">
        <span @click="sort(SortColumn.CURRENT_VALUE)">
          {{ $t('assetList.tableFilters.currentValue') }}
          <IconFilterArrow
            :is-selected="selectedColumn === SortColumn.CURRENT_VALUE"
            :is-asc="isAsc"
          />
        </span>
      </span>
      <span class="column">
        <span
          @click="sort(SortColumn.TARGET_PERCENTAGE)"
          style="margin-left: -14px"
        >
          {{ $t('assetList.tableFilters.targetPercentage') }}
          <IconFilterArrow
            :is-selected="selectedColumn === SortColumn.TARGET_PERCENTAGE"
            :is-asc="isAsc"
          />
        </span>
      </span>
      <span class="column">
        <span @click="sort(SortColumn.DEVIATION)"
          >{{ $t('assetList.tableFilters.deviation') }}
          <IconFilterArrow
            :is-selected="selectedColumn === SortColumn.DEVIATION"
            :is-asc="isAsc"
          />
        </span>
      </span>
    </div>
    <div class="filter-background"></div>
    <div class="filter-shadow" v-if="showShadow"></div>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue'
import { ref } from 'vue'
import IconFilterArrow from '@/assets/icons/IconFilterArrow.vue'
import { SortColumn } from '@/models/enums/SortEnum'
import { sortAssetList } from '@/composables/UseTableFilters'

const props = defineProps({
  showShadow: {
    type: Boolean,
    default: false,
  },
})

const selectedColumn: Ref<SortColumn> = ref(SortColumn.PRICE)
const isAsc: Ref<boolean> = ref(false)

function sort(column: SortColumn) {
  // Change the sort direction if selected column is clicked again
  if (selectedColumn.value === column) {
    isAsc.value = !isAsc.value
  }
  // Set the selected column
  selectedColumn.value = column

  sortAssetList(column, isAsc.value)
}
</script>

<style lang="scss">
@import '@/assets/scss/wrappers/table-filters.scss';
</style>
