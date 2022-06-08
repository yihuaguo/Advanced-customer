import { createRouter, createWebHashHistory } from 'vue-router'
import Page1 from '../pages/Page1.vue'
import Page2 from '../pages/Page2.vue'
import Page3 from '../pages/Page3.vue'
import Page4 from '../pages/Page4.vue'

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
    }, {
        path: "/page3",
        name: "page3",
        component: Page3,
        meta: {
            title: '页面3'
        }
    }, {
        path: "/page4",
        name: "page4",
        component: Page4,
        meta: {
            title: '页面4'
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    scrollBehavior: () => ({ y: 0 }), // 路由跳转后回到顶部
    routes,
})

export default router