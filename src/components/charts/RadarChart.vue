<template>
  <RadarChart
    :chart-data="data"
    :options="options"
    css-classes="radar-chart-container"
  />
</template>

<script setup>
import { ref, computed } from 'vue'
import { RadarChart } from 'vue-chart-3'
import {
  Chart,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement
} from 'chart.js'
import { useI18n } from 'vue-i18n'
import { ChartColumnEnum } from '@/models/enums/ChartColumnEnum';
import { buildChartDataArrays } from '@/composables/charts/UseRadarChart';

const { t } = useI18n()
const chartDataArrays = buildChartDataArrays()

console.log(chartDataArrays)

Chart.register(
    RadarController,
    RadialLinearScale,
    PointElement,
    LineElement
)

const data = computed(() => ({
    labels: chartDataArrays.labels,
    datasets: [{
      label: t('overview.radarChart.labels.targetDistribution'),
      data: chartDataArrays.targetDistribution,
      fill: true,
      backgroundColor: ChartColumnEnum.BACKGROUND_COLOR_POSITIVE_10,
      borderColor: ChartColumnEnum.BACKGROUND_COLOR_POSITIVE_30,
      pointBorderColor: ChartColumnEnum.BACKGROUND_COLOR_POSITIVE_30,
      pointBackgroundColor: ChartColumnEnum.BACKGROUND_COLOR_POSITIVE_30
    }, {
      label: t('overview.radarChart.labels.currentDistribution'),
      data: chartDataArrays.currentDistribution,
      fill: true,
      backgroundColor: ChartColumnEnum.BACKGROUND_COLOR_POSITIVE_30,
      borderColor: ChartColumnEnum.BORDER_COLOR_POSITIVE,
      pointBorderColor: ChartColumnEnum.BORDER_COLOR_POSITIVE,
      pointBackgroundColor: ChartColumnEnum.BORDER_COLOR_POSITIVE
    }]
}))

const options = ref({
  plugins: {
    title: {
      text: 'Radar Chart',
    },
  },
  elements: {
    line: {
      tension: 0
    }
  },
})
</script>

<style lang="scss" scoped>
.radar-chart-container {
  width: 500px;
}
</style>
