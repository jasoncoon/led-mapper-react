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

test("parsing text in coordinates throws an error", () => {
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
    input: "0\t0\t0\n0\t1\t1",
    leds: [
      { index: 0, x: 0, y: 0, angle: 45, radius: 0.7071067811865476 },
      { index: 0, x: 1, y: 1, angle: 225, radius: 0.7071067811865476 },
    ],
    maxAngle: 225,
    maxIndex: 0,
    maxRadius: 0.7071067811865476,
    maxX: 1,
    maxY: 1,
    middleX: 0.5,
    middleY: 0.5,
    minAngle: 45,
    minIndex: 0,
    minRadius: 0.7071067811865476,
    minX: 0,
    minY: 0,
    width: 2,
  });
});
