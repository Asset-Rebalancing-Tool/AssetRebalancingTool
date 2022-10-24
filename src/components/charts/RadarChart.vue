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
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)'
    }, {
      label: t('overview.radarChart.labels.targetValueLabel'),
      data: [28, 48, 40, 19, 96, 27, 100],
      fill: true,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      pointBackgroundColor: 'rgb(54, 162, 235)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(54, 162, 235)'
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
