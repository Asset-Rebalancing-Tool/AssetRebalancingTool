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
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
} from 'chart.js'
import { useI18n } from 'vue-i18n'
import { ChartColumnEnum } from '@/models/enums/ChartColumnEnum';
import { buildChartDataArrays } from '@/composables/charts/UseRadarChart';

const { t } = useI18n()
const chartDataArrays = buildChartDataArrays()

Chart.register(
    RadarController,
    RadialLinearScale,
    PointElement,
    LineElement,
    CategoryScale,
    LinearScale,
)

const data = computed(() => ({
    labels: chartDataArrays.labels,
    datasets: [{
      label: t('overview.radarChart.labels.targetDistribution'),
      data: chartDataArrays.targetDistribution,
      fill: true,
      backgroundColor: ChartColumnEnum.BACKGROUND_COLOR_POSITIVE_05,
      borderColor: ChartColumnEnum.BACKGROUND_COLOR_POSITIVE_30,
      pointBorderColor: ChartColumnEnum.BACKGROUND_COLOR_POSITIVE_30,
      pointBackgroundColor: ChartColumnEnum.BACKGROUND_COLOR_POSITIVE_30,
    }, {
      label: t('overview.radarChart.labels.currentDistribution'),
      data: chartDataArrays.currentDistribution,
      fill: true,
      backgroundColor: ChartColumnEnum.BACKGROUND_COLOR_POSITIVE_45,
      borderColor: ChartColumnEnum.BORDER_COLOR_POSITIVE,
      pointBorderColor: ChartColumnEnum.BORDER_COLOR_POSITIVE,
      pointBackgroundColor: ChartColumnEnum.BORDER_COLOR_POSITIVE,
    }]
}))

const options = ref({
  events: [],
  plugins: {
    title: {
      display: false
    },
    legend: {
      display: false,
      position: 'bottom',
      labels: {
        color: '#FFFFFF',
        borderWidth: 0,
      }
    },
  },
  elements: {
    point: {
      radius: 0,
    },
    line: {
      fill: true,
      borderWidth: 3.5,
      tension: 0.02
    },
  },
  layout: {
    padding: 18
  },
  scales: {
    display: false,
    r: {
      grid: {
        color: 'rgba(60,68,77,0.6)',
      },
      angleLines: {
        color: 'rgba(60,68,77,0.6)' // only start lines
      },
      pointLabels:{
        font: {
          size: 10,
          weight: 500
        },
        background: '#000000',
        color: '#FFFFFF'
      },
      ticks: {
        display: true,
        beginAtZero: true,
        suggestedMin: 50,
        suggestedMax: 100,
        backdropColor: '#000000',
        color: '#B5B5B5',
        showLabelBackdrop: false,
        /*color: '#FFFFFF',
        showLabelBackdrop: true,*/
        font: {
          size: 10,
          weight: 500
        },
        backdropPadding: 1
      },
    },
  }
})
</script>

<style lang="scss" scoped>
.radar-chart-container {

}
</style>
