<script>
  import { loading, activeData, currentYear } from "./../utils/stores.js";
  import Loading from "./Loading.svelte";

  import { format } from "d3-format";
  import { onMount, afterUpdate } from "svelte";
  import mapboxgl from "mapbox-gl";
  import * as topojson from "topojson-client";
  import { csvParse } from "../utils/csv-parse";

  export let gridFile,
    data,
    stops,
    mapFill = "#2f4752";
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

  // let fakedata = [
  //   {
  //     min: 0.2,
  //     max: 1.0,
  //     color: "red",
  //   },
  //   {
  //     min: 1.0,
  //     max: 2.0,
  //     color: "blue",
  //   },
  //   {
  //     min: 2.0,
  //     max: 3.0,
  //     color: "orange",
  //   },
  //   {
  //     min: 3,
  //     max: 4,
  //     color: "green",
  //   },
  //   {
  //     min: 4,
  //     max: 4.9,
  //     color: "purple",
  //   },
  // ];

  // The things we are fetching get stored here, so we can wait until they are fetched.
  const fetching = [`./geo/${gridFile}.topojson`, `./data/${data[0].value}`].map(f => {
    console.log("Starting fetch for", f, f.indexOf(".csv") > -1);
    return fetch(f).then(req => (f.indexOf(".csv") > -1 ? req.text() : req.json()));
  });

  afterUpdate(() => {
    console.log("Map update. A mapdate!");

    layers.forEach(l => {
      let visibilityState = l === `grid-${$currentYear}` ? "visible" : "none";
      map.setLayoutProperty(l, "visibility", visibilityState);
    });
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
          // console.log({ Data: csvParse(d[1]) });
          const geoData = mergeProps(csvParse(d[1]), topojson.feature(d[0], d[0].objects[gridFile]));
          // console.log({ geoData });

          // Add the grid to the map. It was first in our array
          // of files to fetch, so it will be first here, too.
          map.addSource("grid", {
            type: "geojson",
            data: geoData,
          });

          // Add grid for each of our years
          for (let i = 2020; i < 2051; i += 5) {
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
  <!-- <div class="legend">
      <span class="label">Legend</span>
      <ol class="legend__list">
        {#each fakedata as d, i}
          <li class="legend__list-item">
            {#if i + 1 < data.length}<span class="legend__list-item__label">{format('.1f')(d.max)}</span>{/if}
            <span style="background:{d.color}" class="legend__list-item__box" />
          </li>
        {/each}
      </ol>
    </div> -->

  <Loading />
  <div bind:this={mapContainer} class="map" />
</div>
