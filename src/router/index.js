import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/debug',
        name: 'debug',
        component: () => import('../views/DebugView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router