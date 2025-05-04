import { expect, test } from "vitest";
import { parseCoordinatesText } from "./coordinates";
import {
  GlassesCoordinates,
  GlassesCoordinatesInput,
} from "./fixtures/coordinates-glasses";

test("parsing empty text throws error", () => {
  expect(() => parseCoordinatesText("")).toThrowError(
    "Cannot parse empty coordinates."
  );
});

test("parsing empty text throws error", () => {
  expect(() => parseCoordinatesText("0\t1\n1\ta")).toThrowError(
    'The value "a" at row 1, column 1 is not a number.'
  );
});

test("parse glasses", () => {
  expect(parseCoordinatesText(GlassesCoordinatesInput)).toEqual(
    GlassesCoordinates
  );
});

test("finds duplicate indices", () => {
  const input = `0	0	0
0	1	1`;
  expect(parseCoordinatesText(input)).toEqual({
    duplicateIndices: [0],
    gaps: [],
    height: 2,
    input,
    leds: [
      {
        index: 0,
        x: 0,
        y: 0,
      },
      {
        index: 0,
        x: 1,
        y: 1,
      },
    ],
    maxIndex: 0,
    maxX: 1,
    maxY: 1,
    middleX: 0.5,
    middleY: 0.5,
    minIndex: 0,
    minX: 0,
    minY: 0,
    rows: [
      [0, 0, 0],
      [0, 1, 1],
    ],
    width: 2,
  });
});
