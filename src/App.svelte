<script>
  import { activeData, currentYear, loading } from "./utils/stores.js";

  // UTILS
  import { onMount, afterUpdate } from "svelte";
  import { getMapData } from "./utils/get-map-data";

  // COMPONENTS
  import Map from "./components/Map.svelte";
  import Loading from "./components/Loading.svelte";
  import Nav from "./components/Nav.svelte";
  import DataDescription from "./components/DataDescription.svelte";

  // export let config = {};
  export let data = [];
  export let grid = "";
  export let yearLabel = "year";
  export let dataLabel = "data";
  export let years;
  export let stops = [];
  export let mapFill;
  export let gridID;

  export let firstData;
  let oldData = firstData;
  let geoData;
  let map;
  let container;

  $: descriptionData = $activeData ? data[$activeData] : data[firstData];

  onMount(async () => {
    $currentYear = years.start;
    geoData = await getMapData(grid, firstData, data, gridID);
  });

  afterUpdate(async () => {
    // Check to make sure this update is for new data
    if (oldData !== $activeData && $activeData) {
      // activate loading mode
      $loading = true;

      // Remember what we had, to check next time.
      oldData = $activeData;

      // Clear out the mapped data, which will destroy the instance of the component
      geoData = null;

      // get the new data for the map. When it loads, this will trigger a new map.
      geoData = await getMapData(grid, $activeData, data, gridID);
    }
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

  .map-wrapper {
    width: 100%;
    height: 400px;
    background: #eee;
    position: relative;
  }
</style>

<div bind:this={container} class="projections">
  <Nav {data} {yearLabel} {dataLabel} {years} {firstData} />
  <DataDescription {...descriptionData} />
  <div class="map-wrapper">
    {#if $loading}
      <Loading />
    {/if}
    {#if geoData}
      <Map bind:this={map} {loading} gridFile={grid} {data} {stops} {mapFill} {years} {geoData} />
    {/if}
  </div>
</div>
