import {ConfigApiUrl} from "../../config.js";
import {apiFetch} from "../index.js";
import {useMutation, useQuery, useQueryClient} from "@tanstack/vue-query";

export const useListRepositoriesQuery = (tenantSlug, projectSlug) => useQuery({
    queryKey: ['repositories', tenantSlug, projectSlug],
    queryFn: () => listRepositoriesQueryFn(tenantSlug, projectSlug),
})

export const listRepositoriesQueryFn = async (tenantSlug, projectSlug) => {
    const url = new URL(
        ConfigApiUrl() + `/api/v1/tenants/${tenantSlug}/projects/${projectSlug}/repositories`
    )

    return await apiFetch(url.toString())
}

export const useCreateRepositoryMutation = (tenantSlug, projectSlug) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => createRepositoryMutationFn(tenantSlug, projectSlug, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['repositories', tenantSlug, projectSlug])
        },
    })
}

export const createRepositoryMutationFn = async (tenantSlug, projectSlug, data) => {
    const url = new URL(
        ConfigApiUrl() + `/api/v1/tenants/${tenantSlug}/projects/${projectSlug}/repositories`
    )

    return await apiFetch(url.toString(), {
        method: 'POST',
        body: data,
    })
}
