<template>
  <div class="table-filter">
    <span class="column info">
      <span>Asset Bezeichnung <IconFilterArrow /></span>
    </span>
    <span class="column">
      <span>Kurswert (YTD)<IconFilterArrow /></span>
    </span>
    <span class="column">
      <span>gehaltene Anteile<IconFilterArrow /></span>
    </span>
    <span class="column">
      <span>aktueller Ist-Wert<IconFilterArrow /></span>
    </span>
    <span class="column">
      <span>Soll-Wert<IconFilterArrow /></span>
    </span>
    <span class="column">
      <span>Abweichung<IconFilterArrow /></span>
    </span>
  </div>
</template>

<script lang="ts" setup>
import IconFilterArrow from '@/assets/icons/IconFilterArrow.vue'
</script>

<style lang="scss">
@import '@/assets/scss/wrappers/table-filters.scss';
</style>
