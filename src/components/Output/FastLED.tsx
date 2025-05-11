import { Input, Space } from "antd";
import { useMemo } from "react";
import { generateFastLedMapCode } from "../../input/fastLed";
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
