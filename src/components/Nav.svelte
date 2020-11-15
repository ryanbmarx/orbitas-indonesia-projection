<script>
  import Timeline from "./Timeline.svelte";
  import InputSelect from "./InputSelect.svelte";
  import { loading, activeData } from "../utils/stores";
  import { onMount } from "svelte";
  export let data;
  export let yearLabel;
  export let dataLabel;
  export let years;

  let options = Object.keys(data).map(d => {
    return {
      label: data[d].label,
      value: d,
    };
  });
  // The acutal input el.
  let dataMenu;

  function setData() {
    $activeData = dataMenu.value;
    console.log(`Changing data from ${$activeData} to ${dataMenu.value}`);
  }

  // onMount(() => {
  //   // setData();
  // });
</script>

<style>
  .nav {
    display: flex;
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
