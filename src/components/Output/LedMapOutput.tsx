import { Tabs } from "antd";
import { LedMap } from "../../types";
import FastLedOutput from "./FastLED";
import PixelblazeOutput from "./Pixelblaze";

export default function LedMapOutput(
  { ledMap }: { ledMap: LedMap }
) {
  return (
    <Tabs
      items={[{
        key: 'fastled',
        label: 'FastLED',
        children: <FastLedOutput ledMap={ledMap} />
      }, {
        key: 'pixelblaze',
        label: 'Pixelblaze',
        children: <PixelblazeOutput ledMap={ledMap} />
      }]} />
  );
}