# Orbitas Indonesia projections

This is a project built for [Orbitas](orbitas.finance) in the fall of 2020 by [MG Strategy + Design](https://mgstrategy.design/). It uses [MapBox GL](https://docs.mapbox.com/mapbox-gl-js/api/) inside the [Svelte](https://svelte.dev/) javascript framework. These interactives can live pretty much anywhere, but are intended for Orbitas' Wordpress-based CMS. It is bundled/compiled with [Rollup](https://rollupjs.org/guide/en/).

This is one interactive rig designed to display two different presentations: capacity and tree cover.

## What's included?

The "starting point" for these interactives is `/src/main.js`, which uses the overarching `/src/App.svelte`. Beyond that, there are directories for:

- The various Svelte components: `src/components/`
- The [topojson](https://github.com/topojson/topojson) files (one for each presentation): `src/geo/`
- The different data files (several for each presentation): `src/data/`
- Helpful JS utilities: `src/utils/`

## Getting started

Before beginning work, you will need the associated mapbox token. It should be exported from a `.env` as the variable `MAPBOX_TOKEN`.

Clone this repo into a working directory and install dependecies using `npm ci`. To run these presentations locally, start the development server (`npm run dev`) and visit [https://localhost:5000](https://localhost:5000).

## Deploying: How to actually use this.

There are two required assets: `bundle.js` and `bundle.css`. They are the processed/compiled code and can be found in `/public`. They need to be included only once per page, no matter how many presentations there are.

The basic markup required is:

```html
<figure class="projections-map-wrapper">
  <figcaption>
    <h2>Map subhede</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Auctor urna nunc id cursus metus aliquam eleifend mi. Bibendum neque
    </p>
  </figcaption>
  <div class="orbitas-projections-map"></div>
  <script class="config" type="application/json">
    // ... configuration options
  </script>
</figure>
```

There are logical, semantic, accesible spots for a header and introduction to the graphic followed by a container and a script tag for JSON-based configuration options. The above code can be placed into an HTML block in Wordpress' Gutenberg editor. Both assets can be placed here, too, though the CSS bundle would ideally be added to the page's `<head>`.

### Configuring

There are several options and bits of text written here which affect the presentation's display. See `/public/index.html` for complete examples. Here are the highlights:

```json
{
  // The color used to fill each cell. Any valid CSS chex color will do.
  "mapFill": "#2f4752",
  //   The data for each map will be codified into the cell's opacity. Read more about these stops here: https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/
  "stops": [
    [0, 0.25],
    [10, 0.5],
    [20, 0.75],
    [30, 1]
  ],
  // The name of the topojson file to use here
  "grid": "grid-lg.min",
  //   Some nav labeling, put here for easy editing
  "yearLabel": "Select a year",
  "dataLabel": "Select a projection",
  //   The list of different data projections to use for each presnetation
  "data": {
    //   Start with a unique Key for each data
    "bau": {
      // What is the name of the projection? This will be used, for example, in the dropdown data picker.
      "label": "BAU",
      //   The filename of the data file to use
      "value": "indonesia_bau_scenario_5yr_step_forestcover_skm.csv",
      //   A brief description of what the data show, found above the map
      "description": "A brief description of Bau. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
    }
    // ...
  },
  //   Which data (by unique key) should be displayed on load?
  "firstData": "bau",
  //   What is the name of the unique ID to be used to join the data to the geo file?
  "gridID": "uni_ID"
}
```
