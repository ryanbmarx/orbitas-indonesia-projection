<script>
  // STORES
  import { currentYear, loading } from "./../utils/stores.js";

  // COMPONENTS
  import Legend from "./Legend.svelte";

  // UTILS
  import { onMount, afterUpdate } from "svelte";
  import mapboxgl from "mapbox-gl";

  export let data;
  export let stops;
  export let geoData;
  export let mapFill = "#2f4752";

  export let years;
  let oldCurrentYear;
  // for the map instance
  let map;
  // the dom element with the map in it.
  let mapContainer;
  // This will hold IDs of all our added layers
  let layers = [];
  // CONFIG STUFF
  mapboxgl.accessToken = process.env.MAPBOX_TOKEN_R;
  const CENTER = [122.483349, -2.936083];
  const MAP_ZOOM = 3;

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
    console.log("Now mapping", { geoData });
    map = new mapboxgl.Map({
      container: mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: MAP_ZOOM,
      center: CENTER,
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

        // Add grid and color it using the stops provided
        map.addLayer({
          id: gridID,
          type: "fill",
          source: "grid",
          layout: {
            visibility: `grid-${i}` === `grid-${$currentYear}` ? "visible" : "none",
          },
          paint: {
            "fill-opacity": {
              property: `${i}`,
              stops,
            },
            "fill-color": mapFill,
            "fill-opacity-transition": {
              duration: 300,
              delay: 0,
            },
          },
        });
        // Let's not waste our time on grid cells without data.
        // Filter them out of the display by checking for
        // a value for the year in questions.
        map.setFilter(gridID, [">=", `${i}`, 0]);
      }
    });
    map.on("sourcedata", e => {
      if (e.isSourceLoaded) {
        // Do something when the source has finished loading
        $loading = false;
      }
    });
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
  }
</style>

<svelte:options accessors={true} />

<svelte:head>
  <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet" />
</svelte:head>
<div class="map-wrapper">
  <Legend {data} {stops} {mapFill} />
  <div bind:this={mapContainer} class="map" />
</div>
