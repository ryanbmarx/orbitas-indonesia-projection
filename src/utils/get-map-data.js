import { csvParse } from "../utils/csv-parse";
import { feature } from "topojson-client";

// Adds downloaded values from CSV into the geojson
function mergeProps(data, geo, dataKey, gridKey) {
  geo["dataKey"] = dataKey;
  geo.features.forEach(g => {
    const ID = g.properties[gridKey];
    for (let key in data[ID]) {
      g["properties"][key] = data[ID][key];
    }
  });
  return geo;
}
export async function getMapData(gridFile, dataKey, dataList, gridID) {
  // The things we are fetching get stored here, so we can wait until they are fetched.
  let fetching = [`./geo/${gridFile}.topojson`, `./data/${dataList[dataKey].value}`].map(f => {
    // console.log("Starting fetch for", f);
    return fetch(f).then(req => (f.indexOf(".csv") > -1 ? req.text() : req.json()));
  });

  return Promise.all(fetching)
    .then(d => {
      // Merge our shapes with our CSV data
      return mergeProps(csvParse(d[1]), feature(d[0], d[0].objects[gridFile]), dataKey, gridID);
    })
    .catch(e => console.error(e));
}
