import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import i18n from './config/i18n'
import './App.less'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(i18n)
app.mount('#app')