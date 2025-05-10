import { expect, test } from "vitest";
import { GlassesLayout, GlassesLayoutInput } from "./fixtures/layout-glasses";
import { parseLayoutText } from "./layout";

test("parsing empty text throws error", () => {
  expect(() => parseLayoutText("")).toThrowError("Cannot parse empty layout.");
});

test("parsing empty text throws error", () => {
  expect(() => parseLayoutText("0\t1\n1\ta")).toThrowError(
    'The value "a" at row 1, column 1 is not a number or empty cell.'
  );
});

test("parse glasses layout", () => {
  expect(parseLayoutText(GlassesLayoutInput)).toEqual(GlassesLayout);
});

test("finds duplicate indices", () => {
  const input = `0	1	2	0	3	4`;
  expect(parseLayoutText(input)).toEqual({
    duplicateIndices: [0],
    gaps: [],
    height: 1,
    input: "0\t1\t2\t0\t3\t4",
    leds: [
      { index: 0, x: 0, y: 0, angle: 0, radius: 2.5 },
      { index: 1, x: 1, y: 0, angle: 0, radius: 1.5 },
      { index: 2, x: 2, y: 0, angle: 0, radius: 0.5 },
      { index: 0, x: 3, y: 0, angle: 180, radius: 0.5 },
      { index: 3, x: 4, y: 0, angle: 180, radius: 1.5 },
      { index: 4, x: 5, y: 0, angle: 180, radius: 2.5 },
    ],
    maxAngle: 180,
    maxIndex: 4,
    maxRadius: 2.5,
    maxX: 5,
    maxY: 0,
    middleX: 2.5,
    middleY: 0,
    minAngle: 0,
    minIndex: 0,
    minRadius: 0.5,
    minX: 0,
    minY: 0,
    width: 6,
  });
});
