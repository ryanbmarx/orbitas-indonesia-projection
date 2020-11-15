<script>
  import { activeData, currentYear } from "./utils/stores.js";
  import { onMount, afterUpdate } from "svelte";

  import Map from "./components/Map.svelte";
  import Nav from "./components/Nav.svelte";
  // export let config = {};
  export let data = [];
  // export let slug = "";
  export let grid = "";
  export let yearLabel = "year";
  export let dataLabel = "data";
  export let years;
  export let stops;
  export let mapFill;

  export let firstData;
  let oldData = firstData;

  let map;
  let container;
  onMount(() => {
    $currentYear = years.start;
    $activeData = firstData;
  });

  afterUpdate(() => {
    if (oldData !== $activeData) {
      console.log(`APP: Data to map now is ${$activeData}`);
      map.$set({
        mapData: $activeData,
      });
    }
  });

  function click() {
    console.log("CLICK");
    map.$set({ mapData: $activeData });
  }
</script>

<style>
  :global(html body) {
    --sans-serif: "Work Sans", Helvetica, Arial, Lucida, sans-serif;
    --color-orb-orange: #e9492e;
    --color-orb-orange-faded: #e9492e90;
    --color-orb-black: #020203;
    --color-org-soft-grey: #f0f0ef;

    --color-accent: var(--color-orb-orange);
    --color-accent-faded: var(--color-orb-orange-faded);

    --color-background: white;

    --line-width: 3px;
  }

  :global(.projections-map-wrapper) {
    margin: 32px 0;
    padding: 0;
  }
  .projections :global(.select-wrapper label),
  .projections :global(.label) {
    display: block;
    font: 500 14px/1em var(--sans-serif);
    margin: 0 0 16px 0;
  }
</style>

<button on:click={click}>BOOM!</button>
<div bind:this={container} class="projections">
  <Nav {data} {yearLabel} {dataLabel} {years} {firstData} />
  <Map bind:this={map} bind:$activeData gridFile={grid} {data} {stops} {mapFill} {years} mapData={firstData} />
</div>
