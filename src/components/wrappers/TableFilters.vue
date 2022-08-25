<template>
  <div class="table-filter">
    <span class="column info">
      <span>Asset Bezeichnung <IconFilterArrow /></span>
    </span>
    <span class="column">
      <span>Kurswert<IconFilterArrow /></span>
    </span>
    <span class="column">
      <span>gehaltene Anteile<IconFilterArrow /></span>
    </span>
    <span class="column">
      <span>aktueller Ist-<IconFilterArrow /></span>
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

const filters = [
  { columnClass: 'info-column', label: 'Asset Bezeichnung' },
  { columnClass: 'price', label: 'Kurswert' },
  { columnClass: 'owned-quantity', label: 'gehaltene Anteile' },
  { columnClass: 'actual-value', label: 'aktueller Ist-Wert' },
  { columnClass: 'targetPercentage', label: 'Soll-Wert' },
  { columnClass: 'deviation', label: 'Abweichung' },
]
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/wrappers/table-filters.scss';
</style>
