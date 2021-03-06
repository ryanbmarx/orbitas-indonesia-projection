// This marks the cells that go offline.

const fs = require("fs");
const { csvParse } = require("d3");
const { json2csvAsync } = require("json-2-csv");
const files = process.argv.slice(2);
const years = ["2025", "2030", "2035", "2040", "2045", "2050"];
files.forEach(file => {
  fs.readFile(`./public/data/${file}`, "utf-8", (err, data) => {
    if (err) throw err;
    console.log(`++ Processing ${file}`);
    data = csvParse(data, d => {
      // This is our CSV accessor function, which we will use to find the grid cells
      // that are projected to go offline. This means it starts nonzero but ends zero.

      // if the first year is zero or the last year is not zero, then skip this altogether
      if (d["2020"] <= 0 || d["2050"] > 0) return d;

      // Since this _might_ be offline, start checking the years, starting at the end and working backwards
      for (i = years.length - 1; i >= 0; i -= 1) {
        const year = years[i];
        // For each year in the row of data ...
        if (d[year] <= 0) {
          // set the value to offline
          d[year] = "o";
        } else {
          // Since it's not zero, move to the next grid/row
          break;
        }
      }
      return d;
    });

    const csvOptions = {
      keys: ["GRID_ID", "2020", ...years],
    };
    // Put our data back into a CSV and write it to public
    json2csvAsync(data, csvOptions)
      .then(csv => {
        fs.writeFile(`./public/data/${file}`, csv, "utf-8", err => {
          if (err) throw err;
        });
      })
      .catch(err => console.error(err));
  });
});
