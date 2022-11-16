<template>
  <section id="overview">
<!--    <div class="card">
      <div class="card-header">

        <div class="tab-wrapper">
          <div class="card-label-wrapper active">
            <IconPercent style="width: 12px; height: 12px" />
            <p>Aktuelle Aufteilung</p>
          </div>
          <div class="card-label-wrapper">
            <IconPercent style="width: 12px; height: 12px" />
            <p>Ziel-Verteilung</p>
          </div>
        </div>

        <IconInfo style="width: 22px; height: 22px" />
      </div>
      <RadarChart />
    </div>-->
    <div class="card">
      <div class="card-header">
        <div class="card-label-wrapper active">
          <IconPercent style="width: 12px; height: 12px" />
          <p>Abweichung von Soll-Verteilung</p>
        </div>
        <IconInfo style="width: 22px; height: 22px" />
      </div>
      <RadarChart />
    </div>
  </section>
</template>

<script lang="ts" setup>
import RadarChart from '@/components/charts/RadarChart.vue';
import IconPercent from "@/assets/icons/charts/IconPercent.vue";
import IconInfo from "@/assets/icons/charts/IconInfo.vue";

</script>

<style lang="scss">
@import '@/assets/scss/views/overview.scss';
</style>
