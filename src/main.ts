import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './plugins/chart'

import App from './App.vue'
import router from './router'
import Vue3Lottie from 'vue3-lottie'
import { i18n } from '@/i18n';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue3Lottie)
app.use(i18n)

app.mount('#app')
