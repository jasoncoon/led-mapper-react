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

  for (const row of rows) {
    const index = row[0];
    const x = row[1];
    const y = row[2];

    leds.push({
      index,
      x,
      y,
    });
  }

  return loadLedMap(leds, input);
}

export function loadLedMap(leds: LED[], input: string): LedMap {
  let minX, minY, maxX, maxY, minIndex, maxIndex;

  const duplicateIndices: number[] = [];

  let previousIndex = -1;
  const gaps = [];
  const sortedLeds = [...leds].sort((a, b) => a.index - b.index);

  for (const { index, x, y } of sortedLeds) {
    if (isNaN(index) || isNaN(x) || isNaN(y)) continue;

    if (minX === undefined || x < minX) minX = x;
    if (maxX === undefined || x > maxX) maxX = x;

    if (minY === undefined || y < minY) minY = y;
    if (maxY === undefined || y > maxY) maxY = y;

    if (minIndex === undefined || index < minIndex) minIndex = index;
    if (maxIndex === undefined || index > maxIndex) maxIndex = index;

    if (leds.filter((l) => l.index === index).length > 1) {
      if (!duplicateIndices.includes(index)) {
        duplicateIndices.push(index);
      }
    }

    if (index - 1 !== previousIndex && !duplicateIndices.includes(index)) {
      gaps.push(index);
    }

    previousIndex = index;
  }

  if (maxX === undefined) throw new Error("LEDs empty, maxX is undefined.");
  if (minX === undefined) throw new Error("LEDs empty, minX is undefined.");
  if (maxY === undefined) throw new Error("LEDs empty, maxY is undefined.");
  if (minY === undefined) throw new Error("LEDs empty, minY is undefined.");
  if (maxIndex === undefined)
    throw new Error("LEDs empty, maxIndex is undefined.");
  if (minIndex === undefined)
    throw new Error("LEDs empty, minIndex is undefined.");

  const width = maxX - minX + 1;
  const height = maxY - minY + 1;

  const middleX = (maxX - minX) / 2;
  const middleY = (maxY - minY) / 2;

  let minAngle, minRadius;
  let maxAngle, maxRadius;

  minAngle = minRadius = Number.MAX_VALUE;
  maxAngle = maxRadius = Number.MIN_VALUE;

  // use the center defined by the user

  // calculate the angle and radius for each LED, using the defined center
  for (const led of leds) {
    const { x, y } = led;

    const radius = Math.sqrt(
      Math.pow(x - middleX, 2) + Math.pow(y - middleY, 2)
    );
    const radians = Math.atan2(middleY - y, middleX - x);

    let angle = radians * (180 / Math.PI);
    while (angle < 0) angle += 360;
    while (angle > 360) angle -= 360;

    if (angle < minAngle) minAngle = angle;
    if (angle > maxAngle) maxAngle = angle;

    if (radius < minRadius) minRadius = radius;
    if (radius > maxRadius) maxRadius = radius;

    led.angle = angle;
    led.radius = radius;
  }

  return {
    duplicateIndices,
    gaps,
    height,
    input,
    leds,
    maxAngle,
    maxIndex,
    maxRadius,
    maxX,
    maxY,
    middleX,
    middleY,
    minAngle,
    minIndex,
    minRadius,
    minX,
    minY,
    width,
  };
}
