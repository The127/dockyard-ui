import {ConfigApiUrl} from "../../config.js";
import {apiFetch} from "../index.js";
import {useMutation, useQuery, useQueryClient} from "@tanstack/vue-query";

export const useListTenantsQuery = (tenantSlug) => useQuery({
    queryKey: ['tenants'],
    queryFn: () => listTenantsQueryFn(),
})

export const listTenantsQueryFn = async (tenantSlug) => {
    const url = new URL(
        ConfigApiUrl() + `/admin/api/v1/tenants`
    )

    return await apiFetch(url.toString(), tenantSlug)
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

export const useCreateTenantMutation = (tenantSlug) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => createTenantMutationFn(tenantSlug, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['tenants'])
        },
    })
}

export const createTenantMutationFn = async (tenantSlug, data) => {
    const url = new URL(
        ConfigApiUrl() + `/admin/api/v1/tenants`
    )

    return await apiFetch(url.toString(), tenantSlug, {
        method: 'POST',
        body: data,
    })
}
