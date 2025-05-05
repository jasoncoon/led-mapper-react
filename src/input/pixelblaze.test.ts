import { expect, test } from "vitest";
import {
  GlassesPixelblaze,
  GlassesPixelblazeInput,
} from "./fixtures/pixelblaze-glasses";
import { parsePixelblazeText } from "./pixelblaze";

test("parse glasses", () => {
  expect(parsePixelblazeText(GlassesPixelblazeInput)).toEqual(
    GlassesPixelblaze
  );
});
