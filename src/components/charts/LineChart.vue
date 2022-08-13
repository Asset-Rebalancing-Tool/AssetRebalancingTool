<template>
  <LineChart
      :chart-data="data"
      :options="options"
      css-classes="chart-container"
  />
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { LineChart } from 'vue-chart-3'
  import { Chart, LineController, PointElement, LineElement, CategoryScale, LinearScale} from 'chart.js'

  const props = defineProps({
    dataValues: {
      type: Array,
      required: true,
    },
    dataLabels: {
      type: Array,
      required: true,
    }
  })

  Chart.register(LineController, PointElement, LineElement, CategoryScale, LinearScale)

  const dataValues = ref([12, 14, 12, 18, 11, 13, 15])

  const data = computed(() => ({
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
        {
          label: 'Foo',
          data: dataValues.value,
          backgroundColor: '#19B399',
          borderColor: '#19B399'
        }
    ]
  }))

  const options = ref({
    plugins: {
      title: {
        text: 'Line'
      }
    },
    elements: {
      point: {
        radius: 0
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        }
      },
      y: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: false
        }
      }
    }
  })

</script>
