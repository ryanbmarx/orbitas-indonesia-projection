import App from "./App.svelte";

const app = new App({
  hydrate: true,
  target: document.body,
  props: {
    name: "world"
  }
});

export default app;
