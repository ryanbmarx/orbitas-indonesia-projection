<script>
  import Timeline from "./Timeline.svelte";
  import InputSelect from "./InputSelect.svelte";
  import { activeData } from "../utils/stores";

  export let data;
  export let yearLabel;
  export let dataLabel;
  export let years;
  export let firstData;

  let options = Object.keys(data).map(d => {
    return {
      label: data[d].label,
      value: d,
      selected: d === firstData,
    };
  });
  // The acutal input el.
  let dataMenu;
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
    <InputSelect bind:value={$activeData} bind:this={dataMenu} id="data" label={dataLabel} {options} />
  </div>
</nav>
