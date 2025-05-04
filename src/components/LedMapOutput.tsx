import { Button, Input, Space, Tabs } from "antd";
import { LedMap } from "../types";
import ExternalLink from "./ExternalLink";

export default function LedMapOutput(
  { ledMap }: { ledMap: LedMap }
) {
  const value = JSON.stringify(ledMap.rows);

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
            <Button size='small' onClick={async () => {
              await navigator.clipboard.writeText(value);
            }}>
              Copy
            </Button>
          </Space.Compact>
        </>
      }]} />
  );
}