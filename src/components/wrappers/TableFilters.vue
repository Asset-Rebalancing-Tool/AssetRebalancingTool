<template>
  <div class="table-filter">
    <span class="column info">
      <span @click="sort(SortColumn.ENTRY_NAME, direction())"
        >{{ $t('assetList.tableFilters.assetName') }}<IconFilterArrow
      /></span>
    </span>
    <span class="column">
      <span @click="sort(SortColumn.PRICE, direction())"
        >{{ $t('assetList.tableFilters.price') }}<IconFilterArrow
      /></span>
    </span>
    <span class="column">
      <span @click="sort(SortColumn.OWNED_QUANTITY, direction())"
        >{{ $t('assetList.tableFilters.ownedQuantity') }}<IconFilterArrow
      /></span>
    </span>
    <span class="column">
      <span @click="sort(SortColumn.CURRENT_VALUE, direction())"
        >{{ $t('assetList.tableFilters.currentValue') }}<IconFilterArrow
      /></span>
    </span>
    <span class="column">
      <span
        @click="sort(SortColumn.TARGET_PERCENTAGE, direction())"
        style="margin-left: -14px"
        >{{ $t('assetList.tableFilters.targetPercentage') }}<IconFilterArrow
      /></span>
    </span>
    <span class="column">
      <span @click="sort(SortColumn.DEVIATION, direction())"
        >{{ $t('assetList.tableFilters.deviation') }}<IconFilterArrow
      /></span>
    </span>
  </div>
</template>

<script lang="ts" setup>
import IconFilterArrow from '@/assets/icons/IconFilterArrow.vue'
import { SortColumn, SortDirection } from '@/models/enums/SortEnum'
import { useAssetStore } from '@/stores/AssetStore'

const assetStore = useAssetStore()

function direction() {
  const testDirection = SortDirection.ASC
  return testDirection === SortDirection.ASC
    ? SortDirection.DESC
    : SortDirection.ASC
}

/*function sort(property: SortColumn, direction: SortDirection) {
  store.sortListEntries(property, direction)
}*/
</script>

<style lang="scss">
@import '@/assets/scss/wrappers/table-filters.scss';
</style>
