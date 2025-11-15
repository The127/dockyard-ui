import {ConfigApiUrl} from "../../config.js";
import {apiFetch} from "../index.js";
import {useMutation, useQuery, useQueryClient} from "@tanstack/vue-query";

export const useListProjectsQuery = (tenantSlug) => useQuery({
    queryKey: ['projects'],
    queryFn: () => listProjectsQueryFn(tenantSlug),
})

export const listProjectsQueryFn = async (tenantSlug) =>  {
    const url = new URL(
        ConfigApiUrl() + `/api/v1/tenants/${tenantSlug}/projects`
    )

    return await apiFetch(url.toString())
}

export const useGetProjectQuery = (tenantSlug, projectSlug) => useQuery({
    queryKey: ['projects', tenantSlug, projectSlug],
    queryFn: () => getProjectQueryFn(tenantSlug, projectSlug),
})

export const getProjectQueryFn = async (tenantSlug, projectSlug) => {
    const url = new URL(
        ConfigApiUrl() + `/api/v1/tenants/${tenantSlug}/projects/${projectSlug}`
    )

    return await apiFetch(url.toString())
}

export const useCreateProjectMutation = (tenantSlug) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => createProjectMutationFn(tenantSlug, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['projects'])
        },
    })
}

export const createProjectMutationFn = async (tenantSlug, data) => {
    const url = new URL(
        ConfigApiUrl() + `/api/v1/tenants/${tenantSlug}/projects`
    )

    return await apiFetch(url.toString(), {
        method: 'POST',
        body: data,
    })
}
