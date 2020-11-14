import App from "./App.svelte";
// import { currentYear } from "./utils/stores";

// Wait for the page to load
document.addEventListener("DOMContentLoaded", function (e) {
  // Look for our containers
  for (let el of document.querySelectorAll(".orbitas-projections-map")) {
    // Find the first config script
    const config = JSON.parse(el.parentNode.querySelector("script.config").innerHTML);
    // $currentYear = config.years.start;
    // Instantiate our app
    const app = new App({
      hydrate: true,
      target: el,
      props: { ...config },
    });
  }
});
export default app;
