<template>
  <div class="filter-grid">
    <div class="info-column">
      <span class="label">Asset Bezeichnung<span class="icon"></span></span>
    </div>
    <div class="price">
      <span class="label">Kurswert<span class="icon"></span></span>
    </div>
    <div>
      <span class="label">gehaltene Anteile<span class="icon"></span></span>
    </div>
    <div>
      <span class="label">aktueller Ist-Wert<span class="icon"></span></span>
    </div>
    <div>
      <span class="label">Soll-Wert<span class="icon"></span></span>
    </div>
    <div>
      <span class="label">Abweichung<span class="icon"></span></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TableFilters',
})
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/components/asset/table-filters';
</style>
