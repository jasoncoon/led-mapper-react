import { App, Button, Input, Space } from "antd";
import { useState } from "react";
import { parseCoordinatesText } from "../../input/coordinates";
import { LedMap } from "../../types";
import ExternalLink from "../ExternalLink";

export default function CoordinatesInput(
  { initialValue = '', onChange }: { initialValue?: string, onChange: (ledMap: LedMap) => void }
) {
  const { message } = App.useApp();
  const [value, setValue] = useState<string>(initialValue);

  return (
    <>
      Paste coordinates copied from
      <ExternalLink href="https://sheets.google.com" >Google Sheets</ExternalLink>
      or other spreadsheet in tab-delimited text format. It should have three columns: index, x, and y, with or without column headers.
      <Input.TextArea rows={7} value={value} onChange={(e) => {
        setValue(e.currentTarget.value);
      }} />
      <Space.Compact>
        <Button size='small' onClick={() => {
          try {
            const ledMap = parseCoordinatesText(value);
            onChange(ledMap);
            message.success(`Parsed layout with ${ledMap.leds.length.toLocaleString()} LEDs`);
          } catch (error) {
            message.error((error as Error).message);
          }
        }
        }>Parse Layout</Button>
        <Button size='small' onClick={async () => await navigator.clipboard.writeText(value)}>Copy</Button>
      </Space.Compact>
    </>
  );
}
