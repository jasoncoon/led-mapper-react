import { LED, LedMap } from "../types";

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

  let minX, minY, maxX, maxY, minIndex, maxIndex;

  const duplicateIndices: number[] = [];

  for (let y = 0; y < rows.length; y++) {
    const row = rows[y];
    for (let x = 0; x < row.length; x++) {
      const index = row[x];

      if (!index && index !== 0) continue;

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

  const result: LedMap = {
    duplicateIndices,
    gaps,
    height: maxY - minY + 1,
    input,
    leds,
    maxIndex,
    maxX,
    maxY,
    middleX: (maxX - minX) / 2,
    middleY: (maxY - minY) / 2,
    minIndex,
    minX,
    minY,
    rows,
    width: maxX - minX + 1,
  };

  return result;
}
