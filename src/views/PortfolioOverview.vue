<template>
  <section id="overview">
    <div class="card">
      <RadarChart />
    </div>
  </section>
</template>

<script lang="ts" setup>
import RadarChart from '@/components/charts/RadarChart.vue';
</script>

<style lang="scss">
@import '@/assets/scss/views/overview.scss';
</style>
