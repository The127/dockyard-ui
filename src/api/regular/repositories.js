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

    return await apiFetch(url.toString(), tenantSlug)
}

export const useGetRepositoryQuery = (tenantSlug, projectSlug, repositorySlug) => useQuery({
    queryKey: ['repositories', tenantSlug, projectSlug, repositorySlug],
    queryFn: () =>  getRepositoryQueryFn(tenantSlug, projectSlug, repositorySlug)
})

export const getRepositoryQueryFn = async (tenantSlug, projectSlug, repositorySlug) => {
    const url = new URL(
        ConfigApiUrl() + `/api/v1/tenants/${tenantSlug}/projects/${projectSlug}/repositories/${repositorySlug}`
    )

    return await apiFetch(url.toString(), tenantSlug)
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

    return await apiFetch(url.toString(), tenantSlug, {
        method: 'POST',
        body: data,
    })
}

export const usePatchRepositoryMutation = (tenantSlug, projectSlug, repositorySlug) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => patchRepositoryMutationFn(tenantSlug, projectSlug, repositorySlug, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['repositories', tenantSlug, projectSlug, repositorySlug])
        },
    })
}

export const patchRepositoryMutationFn = async (tenantSlug, projectSlug, repositorySlug, data) => {
    const url = new URL(
        ConfigApiUrl() + `/api/v1/tenants/${tenantSlug}/projects/${projectSlug}/repositories/${repositorySlug}`
    )

    return await apiFetch(url.toString(), tenantSlug, {
        method: 'PATCH',
        body: data,
    })
}

export const useGetRepositoryReadmeQuery = (tenantSlug, projectSlug, repositorySlug) => useQuery({
    queryKey: ['repository-readmes', tenantSlug, projectSlug, repositorySlug],
    queryFn: () =>  getRepositoryReadmeQueryFn(tenantSlug, projectSlug, repositorySlug)
})

export const getRepositoryReadmeQueryFn = async (tenantSlug, projectSlug, repositorySlug) => {
    const url = new URL(
        ConfigApiUrl() + `/api/v1/tenants/${tenantSlug}/projects/${projectSlug}/repositories/${repositorySlug}/readme`
    )

    return await apiFetch(url.toString(), tenantSlug)
}

export const useUpdateRepositoryReadmeMutation = (tenantSlug, projectSlug, repositorySlug) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => updateRepositoryReadmeMutationFn(tenantSlug, projectSlug, repositorySlug, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['repository-readmes', tenantSlug, projectSlug, repositorySlug])
        },
    })
}

export const updateRepositoryReadmeMutationFn = async (tenantSlug, projectSlug, repositorySlug, data) => {
    const url = new URL(
        ConfigApiUrl() + `/api/v1/tenants/${tenantSlug}/projects/${projectSlug}/repositories/${repositorySlug}/readme`
    )

    return await apiFetch(url.toString(), tenantSlug, {
        method: 'PUT',
        body: data,
    })
}

