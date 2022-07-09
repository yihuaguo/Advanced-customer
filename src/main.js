import { createApp } from 'vue'
import globalDirective from './directive'
import App from './App.vue'
import store from './store'
import AOS from 'aos'
import 'aos/dist/aos.css'
import router from './router'
import i18n from './config/i18n'
import svgIcon from './components/base_components/SvgIcon.vue'
import 'virtual:svg-icons-register'
import 'ant-design-vue/dist/antd.less'
import './styles/default.css'

AOS.init({
    once: true,
});
const app = createApp(App)
app.use(router)
    .use(store)
    .use(i18n)
    .use(globalDirective)
    .component('svg-icon', svgIcon)
    .mount('#app')