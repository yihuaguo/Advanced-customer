import { createApp } from 'vue'
import Web3 from 'web3/dist/web3.min.js';
import Vue3Storage, { StorageType } from 'vue3-storage';
import imageLazy from './directive'
import App from './App.vue'
import store from './store'
import router from './router'
import i18n from './config/i18n'
import './index.css'
import 'ant-design-vue/dist/antd.less'

const app = createApp(App)
app.config.globalProperties.$Web3 = Web3
app.use(router)
app.use(store)
app.use(i18n)
app.use(imageLazy)
app.use(Vue3Storage, {
    storage: StorageType.Local
})
app.mount('#app')