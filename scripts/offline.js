// This marks the cells that go offline.

const fs = require("fs");
const { csvParse } = require("d3");
const { json2csvAsync } = require("json-2-csv");
const files = process.argv.slice(2);
const years = ["2025", "2030", "2035", "2040", "2045", "2050"];
files.forEach(file => {
  fs.readFile(`./src/data/${file}`, "utf-8", (err, data) => {
    if (err) throw err;
    console.log(`++ Processing ${file}`);
    data = csvParse(data, d => {
      for (let year of years) {
        if (d["2020"] > 0 && d[year] <= 0) {
          d[year] = "o";
        }
      }
      return d;
    });

    const csvOptions = {
      keys: ["GRID_ID", "2020", ...years],
    };

    json2csvAsync(data, csvOptions)
      .then(csv => {
        fs.writeFile(`./public/data/${file}`, csv, "utf-8", err => {
          if (err) throw err;
        });
      })
      .catch(err => console.error(err));
  });
});
