<script>
  import Timeline from "./Timeline.svelte";
  import InputSelect from "./InputSelect.svelte";
  import { loading, activeData } from "../utils/stores";
  import { onMount } from "svelte";
  export let options = [];
  export let yearLabel;
  export let dataLabel;
  export let years;

  // The acutal input el.
  let dataMenu;
  function setData() {
    console.log(`Changing data from ${$activeData} to ${dataMenu.value}`);
    $activeData = dataMenu.value;
  }

  onMount(() => {
    setData();
  });
</script>

<style>
  .nav {
    display: flex;
    /* grid-template: auto / repeat(auto-fit, minmax(300px, 1fr)); */
    /* grid-gap: 24px; */
    gap: 24px;
    flex-wrap: wrap;
  }

  .select-wrapper {
    flex: 1 1 255px;
  }

  :global(.select) {
    --input-height: 44px;
    --border-radius: 0;
    --color-icon: var(--color-accent) !important;
    --outline-color: var(--color-accent) !important;
    border: var(--line-width, 3px) solid var(--color-accent);
    font-family: var(--sans-serif);
  }
</style>

<nav class="nav">
  <Timeline label={yearLabel} {...years} />
  <div class="select-wrapper">
    <InputSelect bind:this={dataMenu} id="data" label={dataLabel} {options} on:input={setData} />
  </div>
</nav>
