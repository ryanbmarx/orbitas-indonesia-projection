<script>
  import Loading from "./Loading.svelte";
  import { format } from "d3-format";
  import { onMount } from "svelte";
  import mapboxgl from "mapbox-gl";

  let mapContainer;
  let data = [
    {
      min: 0.2,
      max: 1.0,
      color: "red",
    },
    {
      min: 1.0,
      max: 2.0,
      color: "blue",
    },
    {
      min: 2.0,
      max: 3.0,
      color: "orange",
    },
    {
      min: 3,
      max: 4,
      color: "green",
    },
    {
      min: 4,
      max: 4.9,
      color: "purple",
    },
  ];

  onMount(() => {
    mapboxgl.accessToken = process.env.MAPBOX_TOKEN_R;

    // CONFIG STUFF
    const SLUG = "indonesia";
    const LOCATION = "Indonesia";
    const CENTER = [122.483349, -2.936083];
    const MAP_ZOOM = 3;

    // UI ELEMENTS
    const SLIDER = document.getElementById("slider");
    const END_DATE = document.getElementById("date");

    // INIT THE MAP
    var map = new mapboxgl.Map({
      container: mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: MAP_ZOOM,
      center: CENTER,
    });
    map.scrollZoom.disable();
    map.addControl(new mapboxgl.NavigationControl());
  });
</script>

<style>
  .map-wrapper {
    margin: 24px 0;
    position: relative;
  }

  .map {
    width: 100%;
    height: 400px;
    background: #eee;
  }

  .legend__list {
    margin: 0;
    padding: 0;
    list-style: none;

    display: flex;
    align-items: stretch;
  }

  .legend__list-item {
    flex: 1 1;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-end;
  }
  .legend__list-item__label {
    text-align: right;
    font: 14px/1em var(--sans-serif);
    position: relative;
    transform: translate(3px, 0);
  }

  @supports (width: fit-content) or (width: -moz-fit-content) {
    .legend__list-item__label {
      margin-left: auto;
      width: -moz-fit-content;
      width: fit-content;
      transform: translate(50%, 0);
    }
  }
  .legend__list-item__box {
    display: block;
    height: 6px;
    margin-top: 4px;
  }

  .label {
    position: absolute;
    top: 0;
    left: 0;
  }
  @media all and (min-width: 768px) {
    .legend {
      background: rgba(255, 255, 255, 0.9);
      position: absolute;
      top: 16px;
      left: 16px;
      width: 33vw;
      max-width: 380px;
      padding: 8px;
      z-index: 90;
    }

    .label {
      position: unset;
    }
  }
</style>

<svelte:head>
  <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet" />
</svelte:head>
<div class="map-wrapper">
  <div class="legend">
    <span class="label">Legend</span>
    <ol class="legend__list">
      {#each data as d, i}
        <li class="legend__list-item">
          {#if i + 1 < data.length}<span class="legend__list-item__label">{format('.1f')(d.max)}</span>{/if}
          <span style="background:{d.color}" class="legend__list-item__box" />
        </li>
      {/each}
    </ol>
  </div>
  <Loading />
  <div bind:this={mapContainer} class="map" />
</div>
