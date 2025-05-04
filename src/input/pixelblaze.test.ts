import { expect, test } from "vitest";
import { parseCoordinatesText } from "./coordinates";
import {
  GlassesPixelblaze,
  GlassesPixelblazeInput,
} from "./fixtures/pixelblaze-glasses";
import { parsePixelblazeText } from "./pixelblaze";

test("parsing empty text throws error", () => {
  expect(() => parsePixelblazeText("")).toThrowError(
    "Cannot parse empty Pixelblaze map."
  );
});

test("parsing empty text throws error", () => {
  expect(() => parsePixelblazeText("0\t1\n1\ta")).toThrowError(
    "Unexpected non-whitespace character after JSON at position 2"
  );
});

test("parse glasses", () => {
  expect(parsePixelblazeText(GlassesPixelblazeInput)).toEqual(
    GlassesPixelblaze
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
