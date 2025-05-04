import { LED, LedMap } from "../types";

export function parseCoordinatesText(input: string): LedMap {
  if (!input) throw new Error("Cannot parse empty coordinates.");

  // split the newline delimited text into lines
  const lines = input.split("\n");

  if (!lines.length) {
    throw new Error("Layout text contains no lines.");
  }

  // map over the lines, convert to rows (array of float number columns)
  const rows = lines
    .filter((row, rowIndex) => {
      if (rowIndex === 0 && row === "i	x	y") return false;
      return true;
    })
    .map((row, rowIndex) => {
      const columns = row.split("\t");
      // parse the string columns into float numbers
      return columns.map((column, columnIndex) => {
        const value = Number.parseFloat(column);
        if (Number.isNaN(value)) {
          throw new Error(
            `The value "${column}" at row ${rowIndex.toString()}, column ${columnIndex.toString()} is not a number.`
          );
        }
        return value;
      });
    });

  if (!rows.length) {
    throw new Error("Coordinates text contains no rows.");
  }

  const leds: LED[] = [];

  let minX, minY, maxX, maxY, minIndex, maxIndex;

  const duplicateIndices: number[] = [];

  for (const row of rows) {
    const index = row[0];
    const x = row[1];
    const y = row[2];

    if (isNaN(index) || isNaN(x) || isNaN(y)) continue;

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
