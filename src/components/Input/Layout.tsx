import { App, Button, Input, Space } from "antd";
import { useState } from "react";
import { parseLayoutText } from "../../input/layout";
import { LedMap } from "../../types";
import CopyButton from "../CopyButton";
import ExternalLink from "../ExternalLink";

export default function LayoutInput(
  { initialValue = '', onChange }:
    { initialValue?: string, onChange: (ledMap: LedMap) => void }
) {
  const { message } = App.useApp();
  const [value, setValue] = useState<string>(initialValue);

  return (
    <>
      Paste an LED layout copied from
      {' '}
      <ExternalLink href="https://sheets.google.com" >Google Sheets</ExternalLink>
      {' '}
      or other spreadsheet in tab-delimited text format, with a unique LED index in each cell.
      LED indices should start at zero. Cells without an LED should be empty.
      <Input.TextArea rows={7} value={value} onChange={(e) => {
        setValue(e.currentTarget.value);
      }} />
      <Space.Compact>
        <Button size='small' onClick={() => {
          try {
            const ledMap = parseLayoutText(value);
            onChange(ledMap);
            message.success(`Parsed layout with ${ledMap.leds.length.toLocaleString()} LEDs`);
          } catch (error) {
            message.error((error as Error).message);
          }
        }
        }>Parse Layout</Button>
        <CopyButton value={value} />
      </Space.Compact>
    </>
  );
}
