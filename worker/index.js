export default {
  async fetch(request, env) {
    const fetchAsset = (pathname) => {
      const assetUrl = new URL(request.url);
      assetUrl.pathname = pathname;
      return env.ASSETS.fetch(new Request(assetUrl, request));
    };

    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;

    // Sites may expose archived static files either from the root or under
    // /dist. Try the archive path before treating the request as a SPA route.
    const archiveResponse = await fetchAsset(`/dist${new URL(request.url).pathname}`);
    if (archiveResponse.status !== 404) return archiveResponse;

    const acceptsHtml = request.headers.get("Accept")?.includes("text/html");

    if (acceptsHtml) {
      const indexResponse = await fetchAsset("/index.html");
      if (indexResponse.status !== 404) return indexResponse;

      return fetchAsset("/dist/index.html");
    }

    return response;
  },
};
