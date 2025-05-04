import { App, Button, Input, Space } from "antd";
import { useState } from "react";
import { parsePixelblazeText } from "../../input/pixelblaze";
import { LedMap } from "../../types";
import ExternalLink from "../ExternalLink";

export default function PixelblazeInput(
  { initialValue = '', onChange }:
    { initialValue?: string, onChange: (ledMap: LedMap) => void }
) {
  const { message } = App.useApp();
  const [value, setValue] = useState<string>(initialValue);

  return (
    <>
      Paste data from your
      <ExternalLink href="https://www.bhencke.com/mapping-in-pixelblaze">Pixelblaze</ExternalLink>
      Mapper tab or
      <ExternalLink href="http://app.bhencke.com/pixelmap.html">Image mapper</ExternalLink>
      in JSON format. It should have one array of [x,y] per LED, all in an array: [[x1,y1],[x2,y2],...] Whitespace does not matter.
      <Input.TextArea rows={7} value={value} onChange={(e) => {
        setValue(e.currentTarget.value);
      }} />
      <Space.Compact>
        <Button size='small' onClick={() => {
          try {
            const ledMap = parsePixelblazeText(value);
            onChange(ledMap);
            message.success(`Parsed Pixeblaze map with ${ledMap.leds.length.toLocaleString()} LEDs`);
          } catch (error) {
            message.error((error as Error).message);
          }
        }
        }>Parse Layout</Button>
        <Button size='small' onClick={async () => { await navigator.clipboard.writeText(value); }}>Copy</Button>
      </Space.Compact>
    </>
  );
}
