import { expect, test } from "vitest";
import { parseCoordinatesText } from "../../input/coordinates";
import { calculateFastLedCoords, mapNumber } from "../../input/fastLed";
import { GlassesCoordinatesInput } from "../../input/fixtures/coordinates-glasses";

test("mapNumber", () => {
  expect(mapNumber(0.5, 0, 1, 0, 256)).toEqual(128);

  expect(mapNumber(50, 0, 100, 0, 10)).toEqual(5);
});

test("calculateCoords", () => {
  const ledMap = parseCoordinatesText(GlassesCoordinatesInput);
  calculateFastLedCoords(ledMap);
  expect(ledMap.leds[0]).toEqual({
    angle: 23.198590513648185,
    angle256: 16,
    index: 0,
    radius: 7.615773105863909,
    radius256: 236,
    x: 1,
    x256: 16,
    y: 0,
    y256: 0,
  });
});
