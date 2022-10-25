<template>
  <LineChart
    :chart-data="data"
    :options="options"
    css-classes="chart-container"
  />
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { PropType } from 'vue'
import { LineChart } from 'vue-chart-3'
import { ChartColumnEnum } from '@/models/enums/ChartColumnEnum'
import {
  Chart,
  LineController,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

Chart.register(
  LineController,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale
)

const props = defineProps({
  dataValues: {
    type: Array as PropType<number[]>,
    required: true,
  },
  dataLabels: {
    type: Array as PropType<string[]>,
    required: true,
  },
  borderWidth: {
    type: String,
    required: true,
  },
  isPositive: {
    type: Boolean,
    required: true,
  },
  displayTitle: {
    type: Boolean,
    default: true,
  },
  displayLegend: {
    type: Boolean,
    default: true,
  }
})

const data = computed(() => ({
  labels: props.dataLabels,
  datasets: [
    {
      data: props.dataValues,
      borderWidth: parseFloat(props.borderWidth),
      fill: true,
      borderColor: props.isPositive
        ? ChartColumnEnum.BORDER_COLOR_POSITIVE
        : ChartColumnEnum.BORDER_COLOR_NEGATIVE,
      backgroundColor: props.isPositive
        ? ChartColumnEnum.BACKGROUND_COLOR_POSITIVE_30
        : ChartColumnEnum.BACKGROUND_COLOR_NEGATIVE_30,
    },
  ],
}))

const options = ref({
  events: [],
  plugins: {
    title: {
      display: props.displayTitle
    },
    legend: {
      display: props.displayLegend
    },
  },
  elements: {
    point: {
      radius: 0,
    },
    line: {
      fill: true,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        display: false,
      },
    },
  },
})
</script>
