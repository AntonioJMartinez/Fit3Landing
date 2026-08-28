const LOCALE_INDEXES = new Map([
  ['/', '/index.html'],
  ['/es', '/es/index.html'],
  ['/es/', '/es/index.html'],
  ['/fr', '/fr/index.html'],
  ['/fr/', '/fr/index.html'],
  ['/it', '/it/index.html'],
  ['/it/', '/it/index.html'],
  ['/de', '/de/index.html'],
  ['/de/', '/de/index.html'],
  ['/pt', '/pt/index.html'],
  ['/pt/', '/pt/index.html'],
  ['/zh', '/zh/index.html'],
  ['/zh/', '/zh/index.html'],
]);

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    if (response.status !== 404 || !['GET', 'HEAD'].includes(request.method)) {
      return response;
    }

    const indexPath = LOCALE_INDEXES.get(new URL(request.url).pathname);

    if (!indexPath) {
      return response;
    }

    const indexUrl = new URL(request.url);
    indexUrl.pathname = indexPath;
    return env.ASSETS.fetch(new Request(indexUrl, request));
  },
};
