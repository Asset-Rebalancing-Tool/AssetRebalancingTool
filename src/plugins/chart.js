import { Chart, Legend, Title, Tooltip } from 'chart.js'

Chart.register(Legend, Title, Tooltip)

Chart.defaults.plugins.title.display = false
Chart.defaults.plugins.legend.display = false

// General setting can be made here
// https://www.chartjs.org/docs/latest/general/
