import {useRoute} from "vue-router";
import {useUserManager} from "../composables/userManager.js";

export async function apiFetch(url, tenant, options = {}) {
    const opts = {...options}
    const method = (options.method || "GET").toUpperCase()

    opts.headers = {
        ...(opts.headers || {}),
    }

    if (opts.body && ["POST", "PUT", "PATCH"].includes(method)) {
        if (typeof opts.body === "object") {
            opts.body = JSON.stringify(opts.body)
        }

        opts.headers["Content-Type"] = "application/json"
    }

    if (tenant) {
        const userMgr = await useUserManager(tenant)
        const user = await userMgr.getUser()
        opts.headers["Authorization"] = "Bearer " + user.access_token
    }

    const response = await fetch(url, opts)

    if (!response.ok) {
        throw new Error(`API error ${response.status}: ${response.statusText}`)
    }

    if (response.status === 204) {
        return null
    }

    return response.json()
}
