import { LED, LedMap } from "../types";
import { loadLedMap } from "./coordinates";

export function parsePixelblazeText(input: string): LedMap {
  if (!input) throw new Error("Cannot parse empty Pixelblaze map.");

  // pixelblaze layout should already be JSON formatted 2D array
  const rows = JSON.parse(input) as number[][];

  if (!Array.isArray(rows)) {
    if (!input) throw new Error("Pixelblaze map does not contain an array.");
  }

  if (rows.length < 1) {
    throw new Error("Coordinates text contains no rows.");
  }

  const leds: LED[] = [];

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];

    if (!Array.isArray(row)) {
      throw new Error(
        `The value at row ${rowIndex.toString()} is not an array.`
      );
    }

    const index = rowIndex;
    const x = row[0];
    const y = row[1];

    if (isNaN(x) || isNaN(y)) {
      throw new Error(
        `The value at row ${rowIndex.toString()} is not an array of numbers.`
      );
    }

    leds.push({
      index,
      x,
      y,
    });
  }

  return loadLedMap(leds, input);
}
