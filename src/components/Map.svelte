<script>
  // STORES
  import { loading, currentYear } from "./../utils/stores.js";

  // COMPONENTS
  import Loading from "./Loading.svelte";
  import DataDescription from "./DataDescription.svelte";
  import Legend from "./Legend.svelte";

  // UTILS
  import { onMount, afterUpdate } from "svelte";
  import mapboxgl from "mapbox-gl";
  import * as topojson from "topojson-client";
  import { csvParse } from "../utils/csv-parse";

  export let gridFile;

  export let data;
  export let stops;
  export let activeData;
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

  let fetching = [];
  // The things we are fetching get stored here, so we can wait until they are fetched.
  fetching = [`./geo/${gridFile}.topojson`, `./data/${data[activeData].value}`].map(f => {
    console.log("Starting fetch for", f);
    return fetch(f).then(req => (f.indexOf(".csv") > -1 ? req.text() : req.json()));
  });

  afterUpdate(() => {
    console.log("Map update. A mapdate!");
    // If the year has changed
    if (oldCurrentYear !== $currentYear) {
      oldCurrentYear = $currentYear;
      layers.forEach(l => {
        let visibilityState = l === `grid-${$currentYear}` ? "visible" : "none";
        map.setLayoutProperty(l, "visibility", visibilityState);
      });
    }
  });

  // Adds downloaded values from CSV into the geojson
  function mergeProps(data, geo) {
    geo.features.forEach(g => {
      const ID = g.properties.Grid_ID;
      for (let key in data[ID]) {
        g["properties"][key] = data[ID][key];
      }
    });
    return geo;
  }

  onMount(() => {
    // INIT THE MAP

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
      Promise.all(fetching)
        .then(d => {
          // Merge our shapes with our CSV data
          const geoData = mergeProps(csvParse(d[1]), topojson.feature(d[0], d[0].objects[gridFile]));

          // Add the grid (now with our CSV data) to the map.
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
        })
        .then(() => {
          //  Turn of the loading indicator.
          $loading = false;
        });
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
    background: #eee;
  }
</style>

<svelte:head>
  <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet" />
</svelte:head>
<DataDescription />
<div class="map-wrapper">
  <!-- <Legend {data} /> -->
  <Loading />
  <div bind:this={mapContainer} class="map" />
</div>
