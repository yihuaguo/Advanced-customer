import { createApp } from 'vue'
import Web3 from 'web3/dist/web3.min.js';
import VueSplide from '@splidejs/vue-splide';
import globalDirective from './directive'
import App from './App.vue'
import store from './store'
import router from './router'
import i18n from './config/i18n'
import svgIcon from './components/base_components/SvgIcon.vue'
import 'virtual:svg-icons-register'
import 'ant-design-vue/dist/antd.less'
import './styles/default.css'

const app = createApp(App)
app.config.globalProperties.$Web3 = Web3
app.use(router)
    .use(store)
    .use(i18n)
    .use(VueSplide)
    .use(globalDirective)
    .component('svg-icon', svgIcon)
    .mount('#app')