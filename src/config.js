const runtime = typeof window !== 'undefined' && window.__ENV__ ? window.__ENV__ : {}

export function ConfigApiUrl() {
    return runtime.DOCKYARD_API_URL ?? 'http://localhost:8082'
}
