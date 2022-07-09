import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home/index.vue'
import Lesson from '../pages/Lesson/index.vue'

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        meta: {
            title: '首页'
        }
    }, {
        path: "/lesson/:lesson+",
        name: "lesson",
        component: Lesson,
        meta: {
            title: '课程'
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    scrollBehavior: () => ({ y: 0 }), // 路由跳转后回到顶部
    routes,
})

export default router