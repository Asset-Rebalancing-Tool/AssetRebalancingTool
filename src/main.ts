import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/css/theme.scss'
import './assets/css/general.scss'
import './assets/css/icons.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
