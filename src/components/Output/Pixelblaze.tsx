import { Input, Space } from "antd";
import { LedMap } from "../../types";
import CopyButton from "../CopyButton";
import ExternalLink from "../ExternalLink";

export default function PixelblazeOutput({ ledMap }: { ledMap: LedMap }) {
  const value = JSON.stringify(ledMap.leds.map(({ x, y }) => ([x, y])));

  return (<>
    Copy and paste this into your {' '}
    <ExternalLink href="https://www.bhencke.com/mapping-in-pixelblaze">
      Pixelblaze
    </ExternalLink>{' '}
    Mapper tab.
    <Input.TextArea rows={3} value={value} readOnly />
    <Space.Compact>
      <CopyButton value={value} />
    </Space.Compact>
  </>);
}