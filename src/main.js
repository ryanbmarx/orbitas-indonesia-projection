import App from "./App.svelte";

const app = new App({
  hydrate: true,
  target: document.querySelector("#orbitas-projections-map"),
  props: {
    name: "world",
  },
});

export default app;
