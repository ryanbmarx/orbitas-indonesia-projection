<script>
  import { onMount } from "svelte";
  import * as analytics from "./utils/analytics.js";

  export let name;

  onMount(() => {
    analytics.fireEvent(`${process.env.PROJECT_SLUG}-loaded`);
  });
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<h1>Hello {name}!</h1>

<p>S2-apps are go.</p>
