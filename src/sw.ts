import {
  registerRoute,
  setCatchHandler,
  setDefaultHandler,
} from "workbox-routing";
import type { ManifestEntry } from "workbox-build";
import { clientsClaim } from "workbox-core";
import { NetworkFirst, NetworkOnly } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

// Give TypeScript the correct global.
declare let self: ServiceWorkerGlobalScope;
declare global {
  interface WorkerGlobalScope {
    __WB_MANIFEST: ManifestEntry[];
  }
}

const data = {
  debug: false,
  credentials: "same-origin",
  fallback: "index.html",
};
const manifest = self.__WB_MANIFEST;

const cacheName = "global";

const cacheEntries: RequestInfo[] = [];

const manifestURLs = manifest.map((entry) => {
  const url = new URL(entry.url, self.location.href);
  cacheEntries.push(
    new Request(url.href, {
      credentials: data.credentials as any,
    }),
  );
  return url.href;
});

self.addEventListener("install", (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(cacheEntries);
    }),
  );
});

self.addEventListener("activate", (event: ExtendableEvent) => {
  // - clean up outdated runtime cache
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      // clean up those who are not listed in manifestURLs
      cache.keys().then((keys) => {
        keys.forEach((request) => {
          data.debug &&
            console.log(`Checking cache entry to be removed: ${request.url}`);
          if (!isRouteAllowedForNetworkFirst(request)) {
            cache.delete(request).then((deleted) => {
              if (data.debug) {
                if (deleted)
                  console.log(
                    `Precached data removed: ${request.url || request}`,
                  );
                else
                  console.log(`No precache found: ${request.url || request}`);
              }
            });
          }
        });
      });
    }),
  );
});

self.addEventListener("fetch", (event: any) => {
  const oneMonthToMilliSecond = 1000 * 60 * 60 * 24 * 30;

  // Delete all caches if one was expired
  caches.open(cacheName).then((cache) =>
    cache.match(event.request.url).then((request) => {
      if (!request) {
        return;
      }
      const date = new Date(request.headers.get("date") as string);
      if (Date.now() > date.getTime() + oneMonthToMilliSecond) {
        console.log("expired: ", request.url);
        caches.delete(cacheName);
      }
    }),
  );
});

const isRouteAllowedForNetworkFirst = (request: any) => {
  const url = new URL(request.url);

  if (request?.destination === "document" && url.host === self.location.host) {
    return true;
  }

  if (
    manifestURLs.includes(url.href) ||
    url.pathname.startsWith("/assets") ||
    url.pathname === "/favicon.ico"
  ) {
    return true;
  }

  return false;
};

registerRoute(
  ({ request }) => isRouteAllowedForNetworkFirst(request),
  new NetworkFirst({
    cacheName,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  }),
);

setDefaultHandler(new NetworkOnly());

// fallback to app-shell for document request
setCatchHandler(({ event }: { event: any }): Promise<Response> => {
  switch (event.request.destination) {
    case "document":
      return caches.match(data.fallback).then((r) => {
        return r ? Promise.resolve(r) : Promise.resolve(Response.error());
      });
    default:
      return Promise.resolve(Response.error());
  }
});

// this is necessary, since the new service worker will keep on skipWaiting state
// and then, caches will not be cleared since it is not activated
self.skipWaiting();
clientsClaim();
