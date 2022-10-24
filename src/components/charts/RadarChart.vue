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
import { ChartColumnEnum } from "@/models/enums/ChartColumnEnum";

const { t } = useI18n()

Chart.register(
    RadarController,
    RadialLinearScale,
    PointElement,
    LineElement
)

const data = computed(() => ({
    labels: [
      'Eating',
      'Drinking',
      'Sleeping',
      'Designing',
      'Coding',
      'Cycling',
      'Running'
    ],
    datasets: [{
      label: t('overview.radarChart.labels.currentValueLabel'),
      data: [65, 59, 90, 81, 56, 55, 40],
      fill: true,
      backgroundColor: ChartColumnEnum.BACKGROUND_COLOR_POSITIVE_30,
      borderColor: ChartColumnEnum.BORDER_COLOR_POSITIVE,
      pointBorderColor: ChartColumnEnum.BORDER_COLOR_POSITIVE,
      pointBackgroundColor: ChartColumnEnum.BORDER_COLOR_POSITIVE
    }, {
      label: t('overview.radarChart.labels.targetValueLabel'),
      data: [28, 48, 40, 19, 96, 27, 100],
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
