import { UserManager } from 'oidc-client-ts'
import {ConfigApiUrl} from "../config.js";
import {apiFetch} from "../api/index.js";

const managers = {}

export async function useUserManager(tenantSlug) {
    if (!managers[tenantSlug]) {
        const oidcConfig = await apiFetch(ConfigApiUrl() + `/api/v1/tenants/${tenantSlug}/oidc`)

        console.log(oidcConfig)

        managers[tenantSlug] = new UserManager({
            authority: oidcConfig.issuer,
            client_id: oidcConfig.client,
            redirect_uri: `${window.location.origin}/${tenantSlug}/oidc/login`,
            response_type: 'code',
            scope: 'openid profile email',
            loadUserInfo: true,
        })
    }
    return managers[tenantSlug]
}