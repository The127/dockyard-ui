import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/tenants',
        name: 'tenant-overview-root',
        children: [
            {
                path: '',
                name: 'tenant-overview',
                component: () => import('../views/tenants/TenantOverview.vue'),
            },
        ],
    },
    {
        path: '/projects',
        name: 'project-overview-root',
        children: [
            {
                path: '',
                name: 'project-overview',
                component: () => import('../views/projects/ProjectOverview.vue'),
            },
        ],
    },
    {
        path: '/settings',
        name: 'settings',
        component: () => import('../views/settings/SettingsPage.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router