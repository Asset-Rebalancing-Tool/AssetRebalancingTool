import { Chart, Legend, Title, Tooltip, Filler } from 'chart.js'

Chart.register(Legend, Title, Tooltip, Filler)

Chart.defaults.plugins.title.display = false
Chart.defaults.plugins.legend.display = false

// General setting can be made here
// https://www.chartjs.org/docs/latest/general/
