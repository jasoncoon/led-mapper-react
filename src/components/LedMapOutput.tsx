import { Input, Space, Tabs } from "antd";
import { LedMap } from "../types";
import CopyButton from "./CopyButton";
import ExternalLink from "./ExternalLink";

export default function LedMapOutput(
  { ledMap }: { ledMap: LedMap }
) {
  const value = JSON.stringify(ledMap.leds.map(({ x, y }) => ([x, y])));

  return (
    <Tabs
      items={[{
        key: 'fastled',
        label: 'FastLED',
        children: <></>
      }, {
        key: 'pixelblaze',
        label: 'Pixelblaze',
        children: <>
          Copy and paste this into your {' '}
          <ExternalLink href="https://www.bhencke.com/mapping-in-pixelblaze">
            Pixelblaze
          </ExternalLink>{' '}
          Mapper tab.
          <Input.TextArea rows={7} value={value} readOnly />
          <Space.Compact>
            <CopyButton value={value} />
          </Space.Compact>
        </>
      }]} />
  );
}