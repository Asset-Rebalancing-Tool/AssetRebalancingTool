<template>
  <DoughnutChart
    :chart-data="data"
    :options="options"
    css-classes="chart-container"
  />
</template>

<script setup>
import { ref, computed } from 'vue'
import { DoughnutChart } from 'vue-chart-3'
import { Chart, DoughnutController, ArcElement } from 'chart.js'

Chart.register(DoughnutController, ArcElement)

const props = defineProps({
  displayTitle: {
    type: Boolean,
    default: true,
  },
  displayLegend: {
    type: Boolean,
    default: true,
  }
})


const dataValues = ref([87, 13])

const data = computed(() => ({
  labels: ['Foo', 'Bar'],
  datasets: [
    {
      label: 'Foo',
      data: dataValues.value,
      backgroundColor: ['#19B399', '#3C444D'],
      borderColor: ['#19B399', '#3C444D'],
      rotation: -115,
      circumference: 230,
      //borderRadius: {topLeft: 15, topRight: 15, bottomLeft: 15, bottomRight: 15},
      //borderRadius: [15, 15],
      cutoutPercentage: 10
    },
  ],
}))

const options = ref({
  plugins: {
    title: {
      display: props.displayTitle
    },
    legend: {
      display: props.displayLegend
    }
  },
  cutoutPercentage: 90
})
</script>
