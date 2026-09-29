import type { ManifestEntry } from "workbox-build";
import { clientsClaim } from "workbox-core";

// Give TypeScript the correct global.
declare let self: ServiceWorkerGlobalScope;
declare global {
  interface WorkerGlobalScope {
    __WB_MANIFEST: ManifestEntry[];
  }
}

// this is necessary, since the new service worker will keep on skipWaiting state
// and then, caches will not be cleared since it is not activated
self.skipWaiting();
clientsClaim();
