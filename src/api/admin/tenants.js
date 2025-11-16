import {ConfigApiUrl} from "../../config.js";
import {apiFetch} from "../index.js";
import {useMutation, useQuery, useQueryClient} from "@tanstack/vue-query";

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

export const useCreateTenantMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => createTenantMutationFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries(['tenants'])
        },
    })
}

export const createTenantMutationFn = async (data) => {
    const url = new URL(
        ConfigApiUrl() + `/admin/api/v1/tenants`
    )

    return await apiFetch(url.toString(), "TODO", {
        method: 'POST',
        body: data,
    })
}
