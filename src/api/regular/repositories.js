import {ConfigApiUrl} from "../../config.js";
import {apiFetch} from "../index.js";
import {useQuery} from "@tanstack/vue-query";

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