<template>
  <RadarChart
    :chart-data="data"
    :options="options"
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
      label: t('overview.radarChart.labels.currentPercentageLabel'),
      data: chartDataArrays.currentPercentages,
      fill: true,
      backgroundColor: ChartColumnEnum.BACKGROUND_COLOR_POSITIVE_30,
      borderColor: ChartColumnEnum.BORDER_COLOR_POSITIVE,
      pointBorderColor: ChartColumnEnum.BORDER_COLOR_POSITIVE,
      pointBackgroundColor: ChartColumnEnum.BORDER_COLOR_POSITIVE
    }, {
      label: t('overview.radarChart.labels.targetPercentageLabel'),
      data: chartDataArrays.targetPercentages,
      fill: true,
      backgroundColor: ChartColumnEnum.BACKGROUND_COLOR_NEGATIVE_30,
      borderColor: ChartColumnEnum.BORDER_COLOR_NEGATIVE,
      pointBorderColor: ChartColumnEnum.BORDER_COLOR_NEGATIVE,
      pointBackgroundColor: ChartColumnEnum.BORDER_COLOR_NEGATIVE
    }]
}))

const options = ref({
  plugins: {
    title: {
      text: 'Radar Chart',
    },
  },
})
</script>
