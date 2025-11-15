import {ConfigApiUrl} from "../../config.js";
import {apiFetch} from "../index.js";
import {useQuery} from "@tanstack/vue-query";

export const useListTenantsQuery = () => useQuery({
    queryKey: ['tenants'],
    queryFn: () => listTenantsQueryFn(),
})

export const listTenantsQueryFn = async () => {
    const url = new URL(
        ConfigApiUrl() + `/admin/api/v1/tenants`
    )

    return await apiFetch(url.toString())
}

export const useGetTenantQuery = (tenantSlug) => useQuery( {
    queryKey: ['tenants', tenantSlug],
    queryFn: () => getTenantQueryFn(tenantSlug),
})

export const getTenantQueryFn = async (tenantSlug) => {
    const url = new URL(
        ConfigApiUrl() + `/admin/api/v1/tenants/${tenantSlug}`
    )

    return await apiFetch(url.toString())
}
