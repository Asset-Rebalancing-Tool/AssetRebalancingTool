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
  backgroundColor: {
    type: String,
    required: true,
  },
  borderColor: {
    type: String,
    required: true,
  },
})

const data = computed(() => ({
  labels: props.dataLabels,
  datasets: [
    {
      label: 'Foo',
      data: props.dataValues,
      borderWidth: parseFloat(props.borderWidth),
      backgroundColor: props.backgroundColor,
      borderColor: props.borderColor,
    },
  ],
}))

const options = ref({
  events: [],
  plugins: {
    title: {
      text: 'Line',
    },
  },
  elements: {
    point: {
      radius: 0,
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
