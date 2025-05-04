import { LED, LedMap } from "../types";

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

  let minX, minY, maxX, maxY, minIndex, maxIndex;

  const duplicateIndices: number[] = [];

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

    if (minX === undefined || x < minX) minX = x;
    if (maxX === undefined || x > maxX) maxX = x;

    if (minY === undefined || y < minY) minY = y;
    if (maxY === undefined || y > maxY) maxY = y;

    if (minIndex === undefined || index < minIndex) minIndex = index;
    if (maxIndex === undefined || index > maxIndex) maxIndex = index;

    if (leds.some((l) => l.index === index)) {
      duplicateIndices.push(index);
    }

    leds.push({
      index,
      x,
      y,
    });
  }

  if (maxX === undefined)
    throw new Error("Layout contains no numbers, maxX is undefined.");
  if (minX === undefined)
    throw new Error("Layout contains no numbers, minX is undefined.");
  if (maxY === undefined)
    throw new Error("Layout contains no numbers, maxY is undefined.");
  if (minY === undefined)
    throw new Error("Layout contains no numbers, minY is undefined.");
  if (maxIndex === undefined)
    throw new Error("Layout contains no numbers, maxIndex is undefined.");
  if (minIndex === undefined)
    throw new Error("Layout contains no numbers, minIndex is undefined.");

  const width = maxX - minX + 1;
  const height = maxY - minY + 1;

  const middleX = (maxX - minX) / 2;
  const middleY = (maxY - minY) / 2;

  let previousIndex = -1;
  const gaps = [];
  const sorted = [...leds].sort((a, b) => a.index - b.index);

  for (const led of sorted) {
    const index = led.index;
    if (index - 1 !== previousIndex && !duplicateIndices.includes(index)) {
      gaps.push(index);
    }
    previousIndex = index;
  }

  return {
    duplicateIndices,
    gaps,
    height,
    input,
    leds,
    maxIndex,
    maxX,
    maxY,
    middleX,
    middleY,
    minIndex,
    minX,
    minY,
    rows,
    width,
  };
}
