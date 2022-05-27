import { createRouter, createWebHashHistory } from 'vue-router'
import Page1 from '../pages/Page1.vue'
import Page2 from '../pages/Page2.vue'

const routes = [
    {
        path: "/",
        name: "page1",
        component: Page1,
        meta: {
            title: '页面1'
        }
    }, {
        path: "/page2",
        name: "page2",
        component: Page2,
        meta: {
            title: '页面2'
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router