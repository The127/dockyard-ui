import {createRouter, createWebHistory} from "vue-router";
import {useUserManager} from "../composables/userManager.js";

const routes = [
    {
        path: '/:tenant',
        name: 'home-root',
        meta: {
            requiresAuth: true,
            breadcrumbFn: () => "Home",
        },
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('../views/HomeView.vue'),
            },
            {
                path: 'oidc',
                meta: {
                    requiresAuth: false,
                },
                children: [
                    {
                        path: 'login',
                        name: 'oidc-login-callback',
                        beforeEnter: async route => {
                            return await handleLoginCallback(route)
                        },
                    },
                    {
                        path: 'logout',
                        name: 'oidc-logout-callback',
                        beforeEnter: async route => {
                            return await handleLogoutCallback(route)
                        },
                    },
                ],
            },
            {
                path: 'tenants',
                name: 'tenant-overview-root',
                children: [
                    {
                        path: '',
                        name: 'tenant-overview',
                        component: () => import('../views/tenants/TenantOverview.vue'),
                        meta: {
                            breadcrumbFn: () => "Tenants",
                        },
                    },
                ],
            },
            {
                path: 'projects',
                name: 'project-overview-root',
                meta: {
                    breadcrumbFn: () => "Projects",
                },
                children: [
                    {
                        path: '',
                        name: 'project-overview',
                        component: () => import('../views/projects/ProjectOverview.vue'),
                    },
                    {
                        path: ':project',
                        name: 'project-details-root',
                        meta: {
                            breadcrumbFn: () => "Details",
                        },
                        children: [
                            {
                                path: '',
                                name: 'project-details',
                                component: () => import('../views/projects/details/ProjectDetails.vue'),
                            },
                            {
                                path: 'repositories',
                                name: 'project-repositories',
                                meta: {
                                    breadcrumbNoLink: true,
                                    breadcrumbFn: () => "Repositories",
                                },
                                children: [
                                    {
                                        path: ':repository',
                                        name: 'repository-details-root',
                                        meta: {
                                            breadcrumbFn: () => "Details",
                                        },
                                        children: [
                                            {
                                                path: '',
                                                name: 'repository-details',
                                                component: () => import('../views/projects/details/repositories/RepositoryDetails.vue'),
                                            },
                                        ],
                                    }
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                path: 'settings',
                name: 'settings',
                component: () => import('../views/settings/SettingsPage.vue'),
            },
        ],
    },
]

async function handleLoginCallback(route) {
    const mgr = await useUserManager(route.params.tenant)
    const user = await mgr.signinRedirectCallback()
    return user.state.destination;
}

async function handleLogoutCallback(route) {
    const mgr = await useUserManager(route.params.tenant)
    await mgr.signoutRedirectCallback()
    await mgr.removeUser()
    return `/${route.params.tenant}`
}

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const authGuard = async (to, from, next) => {
    if (!to.meta.requiresAuth) {
        next()
        return
    }

    const mgr = await useUserManager(to.params.tenant)
    if (await mgr.getUser() !== null) {
        next()
        return
    }

    await mgr.signinRedirect({
        state: {
            destination: to.fullPath,
        }
    })
    next(false)
}

router.beforeEach(authGuard)


export default router