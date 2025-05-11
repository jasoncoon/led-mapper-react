import { LED, LedMap } from "../types";
import { loadLedMap } from "./coordinates";

export function parseLayoutText(input: string): LedMap {
  if (!input) throw new Error("Cannot parse empty layout.");

  // split the newline delimited text into lines
  const lines = input.split("\n");

  if (!lines.length) {
    throw new Error("Layout text contains no lines.");
  }

  // map over the lines, convert to rows (array of int number columns)
  const rows = lines.map((row, rowIndex) => {
    // split the tab-delimited line into columns
    const columns = row.split("\t");
    // parse the string columns into integer numbers
    return columns.map((column, columnIndex) => {
      const value = Number.parseInt(column);
      if (Number.isNaN(value) && column !== "") {
        throw new Error(
          `The value "${column}" at row ${rowIndex.toString()}, column ${columnIndex.toString()} is not a number or empty cell.`
        );
      }
      return value;
    });
  });

  if (!rows.length) {
    throw new Error("Layout text contains no rows.");
  }

  const leds: LED[] = [];

  for (let y = 0; y < rows.length; y++) {
    const row = rows[y];
    for (let x = 0; x < row.length; x++) {
      const index = row[x];

      if (!index && index !== 0) continue;

      leds.push({
        index,
        x,
        y,
      });
    }
  }

  return loadLedMap(leds, input);
}
