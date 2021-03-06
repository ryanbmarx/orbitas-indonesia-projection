/**
 *
 * Takes a CSV in string format, and parses it into a JS object of objects, keyed to the ID. Treats all headers as strings, and assumes the first column is the identifier
 *
 * @param {string} text The source text, to be parsed
 */

export function csvParse(text) {
  // Split the text into rows
  const rows = text.split(/\r?\n/);

  // Grab our header row, removing it from the rows, and remove ID, since we won't need it.
  const headers = rows.shift().split(",").splice(1);

  return rows.reduce((acc, curr) => {
    // Split the current row string into an array
    let row = curr.split(",");
    // Get our grid ID by pulling the first item from that array (removing it from row)
    const ID = row.shift();
    // This generates an object of key/value pairs for the remaining row items
    let newRow = row.reduce((accumulator = {}, currentValue, currentIndex) => {
      accumulator[headers[currentIndex]] = currentValue === "o" ? currentValue : parseFloat(currentValue);
      return accumulator;
    }, {});
    // Adds the grid data (as k/v pairs) to the overall accumulator, keyed to grid IT
    acc[ID] = newRow;

    // DO it again ...
    return acc;
  }, {});
}
