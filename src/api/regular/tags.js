import {ConfigApiUrl} from "../../config.js";
import {apiFetch} from "../index.js";
import {useQuery} from "@tanstack/vue-query";

export const useListTagsQuery = (tenantSlug, projectSlug, repositorySlug) => useQuery({
    queryKey: ['tags', tenantSlug, projectSlug, repositorySlug],
    queryFn: () => listTagsQueryFn(tenantSlug, projectSlug, repositorySlug),
})

export const listTagsQueryFn = async (tenantSlug, projectSlug, repositorySlug) => {
    const url = new URL(
        ConfigApiUrl() + `/api/v1/tenants/${tenantSlug}/projects/${projectSlug}/repositories/${repositorySlug}/tags`
    )

    return await apiFetch(url.toString(), tenantSlug)
}