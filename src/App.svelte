<script>
  import { activeData, currentYear } from "./utils/stores.js";
  import { onMount } from "svelte";

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

  let container;
  onMount(() => {
    $currentYear = years.start;
    // pick our first dataset to show
    // $activeData = data[0].value;
    // console.log($activeData, data[0].value);
    // console.group(slug);
    // console.log({ data });
    // console.log({ grid });
    // console.groupEnd();
  });
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

<div bind:this={container} class="projections">
  <Nav options={data} {yearLabel} {dataLabel} {years} />
  <Map gridFile={grid} {data} {stops} {mapFill} />
</div>
