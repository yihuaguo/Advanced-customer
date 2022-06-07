import { createApp } from 'vue'
import Web3 from 'web3/dist/web3.min.js';
import globalDirective from './directive'
import App from './App.vue'
import store from './store'
import router from './router'
import i18n from './config/i18n'
import localStorage from './utils/stroage'
import './index.css'
import 'ant-design-vue/dist/antd.less'

const app = createApp(App)
app.config.globalProperties.$Web3 = Web3
app.config.globalProperties.$storage = localStorage
app.use(router)
    .use(store)
    .use(i18n)
    .use(globalDirective)
    .mount('#app')
