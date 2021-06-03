import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/css/var.scss'
console.log('env:', import.meta.env.VITE_APP_ENV)

import { setupElement } from './utils/element'

const app = createApp(App)
setupElement(app)
app.use(router).mount('#app')
