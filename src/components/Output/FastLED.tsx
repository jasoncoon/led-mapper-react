import { Input, Space } from "antd";
import { useMemo } from "react";
import { LedMap } from "../../types";
import CopyButton from "../CopyButton";
import ExternalLink from "../ExternalLink";

export default function FastLedOutput({ ledMap }: { ledMap: LedMap }) {
  const value = useMemo<string>(() => generateFastLedMapCode(ledMap), [ledMap]);

  return (<>
    Copy and paste this into your {' '}
    <ExternalLink href="https://www.arduino.cc/en/software">
      Arduino
    </ExternalLink>{' '}
    sketch for{' '}
    <ExternalLink href="https://github.com/FastLED/FastLED">
      FastLED
    </ExternalLink>.{' '}
    Here's an{' '}
    <ExternalLink href="https://github.com/jasoncoon/led-mapper/blob/main/fastled-map-demo/fastled-map-demo.ino">
      example sketch
    </ExternalLink>.
    <Input.TextArea rows={3} value={value} readOnly />
    <Space.Compact>
      <CopyButton value={value} />
    </Space.Compact>
  </>);
}

function generateFastLedMapCode(ledMap: LedMap) {
  const { middleX, middleY, leds, maxX, maxY, minX, minY } = ledMap;

  let minX256, minY256, minAngle, minAngle256, minRadius, minRadius256;
  let maxX256, maxY256, maxAngle, maxAngle256, maxRadius, maxRadius256;

  minX256 = minY256 = minAngle = minAngle256 = minRadius = minRadius256 = Number.MAX_VALUE;
  maxX256 = maxY256 = maxAngle = maxAngle256 = maxRadius = maxRadius256 = Number.MIN_VALUE;

  // use the center defined by the user

  // calculate the angle and radius for each LED, using the defined center
  for (const led of leds) {
    const { x, y } = led;

    const radius = Math.sqrt(Math.pow(x - middleX, 2) + Math.pow(y - middleY, 2));
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

  for (const led of leds) {
    const { x, y, angle, radius } = led;

    const x256 = mapNumber(x, minX, maxX, 0, 255);
    const y256 = mapNumber(y, minY, maxY, 0, 255);
    const angle256 = angle ? mapNumber(angle, 0, 360, 0, 255) : undefined;
    const radius256 = radius ? mapNumber(radius, 0, maxRadius, 0, 255) : undefined;

    led.x256 = Math.round(x256);
    led.y256 = Math.round(y256);
    led.angle256 = angle256 ? Math.round(angle256) : undefined;
    led.radius256 = radius256 ? Math.round(radius256) : undefined;

    if (x256 < minX256) minX256 = x256;
    if (x256 > maxX256) maxX256 = x256;

    if (y256 < minY256) minY256 = y256;
    if (y256 > maxY256) maxY256 = y256;

    if (angle256 !== undefined && angle256 < minAngle256) minAngle256 = angle256;
    if (angle256 !== undefined && angle256 > maxAngle256) maxAngle256 = angle256;

    if (radius256 !== undefined && radius256 < minRadius256) minRadius256 = radius256;
    if (radius256 !== undefined && radius256 > maxRadius256) maxRadius256 = radius256;
  }

  // sort leds by index ascending
  leds.sort((a, b) => a.index - b.index);

  const coordsX = leds.map((led) => led.x256 ?? 0);
  const coordsY = leds.map((led) => led.y256 ?? 0);
  const angles = leds.map((led) => led.angle256 ?? 0);
  const radii = leds.map((led) => led.radius256 ?? 0);

  const coordsX256 = `byte coordsX[NUM_LEDS] = { ${coordsX.map((v) => v.toFixed(0)).join(", ")} };`;
  const coordsY256 = `byte coordsY[NUM_LEDS] = { ${coordsY.map((v) => v.toFixed(0)).join(", ")} };`;
  const angles256 = `byte angles[NUM_LEDS] = { ${angles.map((v) => v.toFixed(0)).join(", ")} };`;
  const radii256 = `byte radii[NUM_LEDS] = { ${radii.map((v) => v.toFixed(0)).join(", ")} };`;

  const fastLedCode = [
    // coordsX,
    // coordsY,
    // angles,
    // radii,
    // "",
    `#define NUM_LEDS ${leds.length.toString()}`,
    "",
    coordsX256,
    coordsY256,
    angles256,
    radii256,
  ].join("\n");

  return fastLedCode;
}

function mapNumber(l: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  if (inMax - inMin + outMin === 0) return 0;

  return ((l - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
