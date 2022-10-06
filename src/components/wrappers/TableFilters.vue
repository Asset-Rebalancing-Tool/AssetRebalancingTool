<template>
  <div class="table-filter">
    <span class="column info">
      <span @click="sort(
          SortColumn.ENTRY_NAME,
          direction()
      )"
    >Asset Bezeichnung <IconFilterArrow /></span>
    </span>
    <span class="column">
      <span @click="sort(
          SortColumn.PRICE,
          direction()
      )"
    >Kurswert (YTD)<IconFilterArrow /></span>
    </span>
    <span class="column">
      <span @click="sort(
          SortColumn.OWNED_QUANTITY,
          direction()
      )"
    >gehaltene Anteile<IconFilterArrow /></span>
    </span>
    <span class="column">
      <span @click="sort(
          SortColumn.CURRENT_VALUE,
          direction()
      )"
    >aktueller Ist-Wert<IconFilterArrow /></span>
    </span>
    <span class="column">
      <span @click="sort(
          SortColumn.TARGET_PERCENTAGE,
          direction()
      )"
    >Soll-Wert<IconFilterArrow /></span>
    </span>
    <span class="column">
      <span @click="sort(
          SortColumn.DEVIATION,
          direction()
      )"
    >Abweichung<IconFilterArrow /></span>
    </span>
  </div>
</template>

<script lang="ts" setup>
import IconFilterArrow from '@/assets/icons/IconFilterArrow.vue'
import  { SortColumn, SortDirection } from "@/models/enums/SortEnum";
import { useAssetMapStore } from '@/stores/AssetMapStore'

const store = useAssetMapStore()

function direction() {
  let testDirection = SortDirection.ASC
  return (testDirection === SortDirection.ASC) ? SortDirection.DESC : SortDirection.ASC
}

/*function sort(property: SortColumn, direction: SortDirection) {
  store.sortListEntries(property, direction)
}*/
</script>

<style lang="scss">
@import '@/assets/scss/wrappers/table-filters.scss';
</style>
