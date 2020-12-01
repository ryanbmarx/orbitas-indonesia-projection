/* link utilities */

const productionRoute = "https://orbitas.finance/wp-content/uploads/map-interactives/";

/**
 * Toggles between the absolute path for the main site and the relative route on local/github.io builds
 * @param {*} asset
 */

export function urlFor(asset) {
  if (!asset) return;

  const path = window.location.host.indexOf("orbitas.finance") > -1 ? productionRoute : window.location;

  const url = new URL(asset, path);
  return url.toString();
}
