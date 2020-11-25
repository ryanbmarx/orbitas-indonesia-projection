<script>
  // OUR SCOPED STORE SOLUTION
  import { key } from "../utils/stores";
  import { getContext } from "svelte";
  let { currentYear, loading } = getContext(key);

  // COMPONENTS
  import LegendBuckets from "./LegendBuckets.svelte";
  import LegendStops from "./LegendStops.svelte";
  import ButtonPeat from "./ButtonPeat.svelte";

  // UTILS
  import { onMount, afterUpdate } from "svelte";
  import mapboxgl from "mapbox-gl";
  import { mesh } from "topojson-client";

  export let data;
  export let geoData;
  export let mapFill = "#2f4752";
  export let legendLabel;

  // DATA VIZ SCALES
  export let stops;
  export let buckets;
  // If the stops property is empty, then assume we have buckets data. Let's hope we do.
  let useBuckets = stops.length === 0;

  export let years;
  let oldCurrentYear;
  // for the map instance
  let map;
  // the dom element with the map in it.
  let container;
  // This will hold IDs of all our added layers
  let layers = [];

  // PEAT!
  export let displayPeat;
  let hasPeat = false;
  let peatVisible = false;
  export let peatColor;

  // CONFIG STUFF
  // export let MAP_CENTER = [119.108664, 3.120056];
  // export let MAX_BOUNDS = [
  //   [88.34694524999765, -14.305533476859381], // Southwest coordinates
  //   [149.87038274999645, 20.263587388602616], // Northeast coordinates
  // ];

  // These are props only so it's easy to make switches based on feedback. These are in `config.mapOptions`
  mapboxgl.accessToken = process.env.MAPBOX_TOKEN;
  // CONFIGURABLE VALUES WITH DEFAULTS
  export let style = "mapbox://styles/lucida-maps/ckhl11xlx05e019pq4tb6d9mx";
  export let minZoom = 1;
  export let maxZoom = 16;

  export let zoom = 1; // Initial zoom
  export let center; // The initial view
  export let bounds; // The initial view
  export let maxBounds; // The max allowed view

  afterUpdate(() => {
    // If the year has changed
    if (oldCurrentYear !== $currentYear) {
      oldCurrentYear = $currentYear;
      layers.forEach(l => {
        let visibilityState = l === `grid-${$currentYear}` ? "visible" : "none";
        map.setLayoutProperty(l, "visibility", visibilityState);
      });
    }
  });

  onMount(async () => {
    // INIT THE MAP
    map = new mapboxgl.Map({
      container,
      style,
      maxZoom,
      minZoom,
      zoom,
      center,
      bounds,
      maxBounds,
    });

    map.scrollZoom.disable();
    map.addControl(new mapboxgl.NavigationControl());

    // This fires when the map has loaded
    map.on("load", function () {
      // Wait until we got the things

      map.addSource("grid", {
        type: "geojson",
        data: geoData,
      });

      // Add grid for each of our years
      for (let i = years.start; i <= years.end; i += years.step) {
        let gridID = `grid-${i}`;
        // Add our grid ID to our list
        layers.push(gridID);

        // Make our painting deccisions here, based on our scales and stuff

        let paint = {
          "fill-color": mapFill,
          "fill-opacity-transition": {
            duration: 300,
            delay: 0,
          },
        };

        if (useBuckets) {
          // We are using buckets
          paint["fill-opacity"] = {
            property: `${i}`,
            stops: buckets,
          };
        } else if (stops.length > 0) {
          // We will be using linear interpolation. We check for it specifically so we can raise an error if we have neither.
          paint["fill-opacity"] = ["interpolate", ["linear"], ["get", `${i}`], ...stops];
        } else {
          // We have neither.
          console.error("A proper map scale has not been configured");
        }

        // Add grid and color it using the stops provided
        map.addLayer({
          id: gridID,
          type: "fill",
          source: "grid",
          layout: {
            visibility: `grid-${i}` === `grid-${$currentYear}` ? "visible" : "none",
          },
          paint,
        });
        // Let's not waste our time on grid cells without data.
        // Filter them out of the display by checking for
        // a value for the year in questions.
        map.setFilter(gridID, [">=", `${i}`, 0]);
      }
    });

    // If we want to see peat, then display it.
    // Otherwise skip this entirely.
    if (displayPeat) {
      map.on("load", function (e) {
        fetch("./geo/peat.min.topojson")
          .then(data => data.json())
          .then(peat => {
            map.addSource("peat", {
              type: "geojson",
              data: mesh(peat),
            });

            map.addLayer({
              id: "peat-layer",
              type: "fill",
              source: "peat",
              layout: {
                visibility: "none",
              },
              paint: {
                "fill-opacity": 0.9,
                "fill-color": peatColor,
                "fill-opacity-transition": {
                  duration: 300,
                  delay: 0,
                },
              },
            });
          })
          .then(() => {
            hasPeat = true;
          });
      });
    }
    map.on("sourcedata", e => {
      if (e.isSourceLoaded) {
        // Do something when the source has finished loading
        $loading = false;
      }
    });

    return () => {
      map.remove();
    };
  });
  function togglePeat() {
    peatVisible = !peatVisible;
    map.setLayoutProperty("peat-layer", "visibility", peatVisible ? "visible" : "none");
  }
</script>

<style>
  .map-wrapper {
    margin: 24px 0;
    position: relative;
  }

  .map {
    width: 100%;
    height: 400px;
  }
</style>

<svelte:options accessors={true} />

<svelte:head>
  <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet" />
</svelte:head>
<div class="map-wrapper">
  {#if useBuckets}
    <LegendBuckets {data} {buckets} {mapFill} label={legendLabel} />
  {:else}
    <LegendStops {data} {stops} {mapFill} label={legendLabel} />
  {/if}
  {#if hasPeat}
    <ButtonPeat on:click={togglePeat} {peatVisible} {peatColor} />
  {/if}
  <div bind:this={container} class="map" />
</div>
