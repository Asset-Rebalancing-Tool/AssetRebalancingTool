<template>
  <div class="table-filter">
    <span class="column info">
      <span @click="sort(
          SortPropertyEnum.ENTRY_NAME,
          direction()
      )"
    >Asset Bezeichnung <IconFilterArrow /></span>
    </span>
    <span class="column">
      <span @click="sort(
          SortPropertyEnum.PRICE,
          direction()
      )"
    >Kurswert (YTD)<IconFilterArrow /></span>
    </span>
    <span class="column">
      <span @click="sort(
          SortPropertyEnum.OWNED_QUANTITY,
          direction()
      )"
    >gehaltene Anteile<IconFilterArrow /></span>
    </span>
    <span class="column">
      <span @click="sort(
          SortPropertyEnum.CURRENT_VALUE,
          direction()
      )"
    >aktueller Ist-Wert<IconFilterArrow /></span>
    </span>
    <span class="column">
      <span @click="sort(
          SortPropertyEnum.TARGET_PERCENTAGE,
          direction()
      )"
    >Soll-Wert<IconFilterArrow /></span>
    </span>
    <span class="column">
      <span @click="sort(
          SortPropertyEnum.DEVIATION,
          direction()
      )"
    >Abweichung<IconFilterArrow /></span>
    </span>
  </div>
</template>

<script lang="ts" setup>
import IconFilterArrow from '@/assets/icons/IconFilterArrow.vue'
import  { SortDirectionEnum, SortPropertyEnum } from "@/models/enums/SortPropertyEnum";
import { useAssetStore } from "@/stores/AssetStore";

const store = useAssetStore()

function direction() {
  let testDirection = SortDirectionEnum.ASC
  return (testDirection === SortDirectionEnum.ASC) ? SortDirectionEnum.DESC : SortDirectionEnum.ASC
}

/*function sort(property: SortPropertyEnum, direction: SortDirectionEnum) {
  store.sortListEntries(property, direction)
}*/
</script>

<style lang="scss">
@import '@/assets/scss/wrappers/table-filters.scss';
</style>
