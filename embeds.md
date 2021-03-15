## ONLY NEED ONCE PER PAGE

Ideally in the `<body>`, at the end:

```html
<script defer src="/wp-content/uploads/map-interactives/bundle.js"></script>
```

Ideally in the page `<head>`:

```html
<link rel="prefetch" href="/wp-content/uploads/map-interactives/geo/grid-lg-2.min.topojson" />
<link rel="prefetch" href="/wp-content/uploads/map-interactives/geo/grid-sm.min.topojson" />
<link rel="stylesheet" href="/wp-content/uploads/map-interactives/bundle.css" />
```

And the two graphics:

```html
<figure class="projections-map-wrapper">
  <figcaption>
    <h2>Optimal industry expansion and contraction across scenarios</h2>
    <p>
      What does this mean in practice? Our analysis of Indonesia’s palm oil sector finds that climate transitions require a shift from incumbent
      companies under different scenarios. The interactive below examines one factor – milling capacity. The increased intensity of climate
      transitions results in milling capacity going offline, as production shifts to optimized locations over future time periods under selected
      Orbitas climate scenarios.
    </p>
  </figcaption>
  <div class="orbitas-projections-map"></div>
  <script class="config" type="application/json">
    {
      "slug": "capacity",
      "mapOptions": {
        "center": [119.108664, 3.120056],
        "zoom": 3,
        "minZoom": 3,
        "maxBounds": [
          [88.34694524999765, -14.305533476859381],
          [149.87038274999645, 20.263587388602616]
        ]
      },
      "icons": [{ "color": "#000", "text": "The installed capacity for this area is projected to be completely offline." }],
      "mapFill": "#e94b60",
      "buckets": [
        [0, 0.05],
        [0.2, 0.25],
        [0.7, 0.55],
        [1.4, 0.75],
        [2.7, 0.95]
      ],
      "slug": "capacity",
      "grid": "grid-sm.min",
      "years": {
        "start": 2020,
        "end": 2050,
        "step": 5
      },
      "yearLabel": "Select a year",
      "dataLabel": "Bunch milling capacity",
      "legendLabel": "Million metric tons per year",
      "data": {
        "bau": {
          "label": "Under BAU (4C) scenario",
          "value": "BAU_CAPACITY_26OCT2020.csv"
        },
        "modest_a": {
          "label": "Under modest (3C) scenario, option A",
          "value": "ModestA_CAPACITY_26OCT2020.csv"
        },
        "modest_b": {
          "label": "Under modest (3C) scenario, option B",
          "value": "ModestB_CAPACITY_26OCT2020.csv"
        },
        "aggressive": {
          "label": "Under aggressive (1.5C) scenario",
          "value": "Aggressive_CAPACITY_26OCT2020.csv"
        }
      },
      "firstData": "bau",
      "gridID": "Grid_ID"
    }
  </script>
</figure>
```

```html
<figure class="projections-map-wrapper">
  <figcaption>
    <h2>Forest Cover</h2>
    <p>
      The effect of climate transitions is also obvious by looking at environmental indicators. Because deforestation is a significant contributor to
      global greenhouse gas emissions, our more ambitious scenarios find substantial growth in global forest cover. Narrowing in on Indonesia, the
      interactive below shows the difference in forest cover across scenarios and over time.
    </p>
  </figcaption>
  <div class="orbitas-projections-map"></div>
  <script class="config" type="application/json">
    {
      "mapFill": "#0c8e76",
      "slug": "tree-cover",
      "years": {
        "start": 2010,
        "end": 2050,
        "step": 5
      },
      "stops": [0, "#d6ff78", 28, "#5cbb3e", 31, "#0c8e76"],
      "mapOptions": {
        "center": [119.108664, 3.120056],
        "zoom": 3,
        "minZoom": 3,
        "maxBounds": [
          [88.34694524999765, -14.305533476859381],
          [149.87038274999645, 20.263587388602616]
        ]
      },
      "grid": "grid-lg-trimmed",
      "yearLabel": "Select a year",
      "dataLabel": "Projected forest cover",
      "legendLabel": "Square kilometers of forest cover",
      "data": {
        "bau": {
          "label": "Under BAU (4C) scenario",
          "value": "indonesia_bau_scenario_5yr_step_forestcover_skm.csv"
        },
        "stabilising": {
          "label": "Under stabilising (3C) scenario",
          "value": "indonesia_stabilising_scenario_110agprice_zerodef_5yr_step_forestcover_skm.csv"
        },
        "coordinated": {
          "label": "Under coordinated (1.5C) scenario",
          "value": "indonesia_coordinated_scenario_110agprice_zerodef_5yr_step_forestcover_skm.csv"
        }
      },
      "firstData": "bau",
      "gridID": "uni_ID",
      "displayPeat": true,
      "dataNote": "Grid cells of green reflect areas with dense tree canopy coverage while grid cells of yellow highlight less tree canopy coverage."
    }
  </script>
</figure>
```
