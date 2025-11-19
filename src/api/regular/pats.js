import {ConfigApiUrl} from "../../config.js";
import {apiFetch} from "../index.js";
import {useMutation, useQuery, useQueryClient} from "@tanstack/vue-query";
import {createProjectMutationFn} from "./projects.js";

export const useCreatePatMutation = (tenantSlug) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => createPatMutationFn(tenantSlug, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['pats'])
        },
    })
}

export const createPatMutationFn = async (tenantSlug, data) => {
    const url = new URL(
        ConfigApiUrl() + `/api/v1/tenants/${tenantSlug}/pats`
    )

    return await apiFetch(url.toString(), tenantSlug, {
        method: 'POST',
        body: data,
    })
}

export const useListPatsQuery = (tenantSlug) => useQuery({
    queryKey: ['pats'],
    queryFn: () => listPatsQueryFn(tenantSlug),
})

export const listPatsQueryFn = async (tenantSlug) => {
    const url = new URL(
        ConfigApiUrl() + `/api/v1/tenants/${tenantSlug}/pats`
    )

    return await apiFetch(url.toString(), tenantSlug)
}
