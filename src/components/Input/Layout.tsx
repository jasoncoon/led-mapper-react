import { App, Button, Input, Space } from "antd";
import { useState } from "react";
import { LedMap, parseLayoutText } from "../../input/layout";
import ExternalLink from "../ExternalLink";

export default function LayoutInput({ initialValue = '', onChange }: { initialValue?: string, onChange: (ledMap: LedMap) => void }) {
  const { message } = App.useApp();
  const [layoutText, setLayoutText] = useState<string>(initialValue);

  return (
    <>
      Paste an LED layout copied from <ExternalLink href="https://sheets.google.com" >Google Sheets</ExternalLink> or other spreadsheet in tab-delimited text format, with a unique LED index in each cell. LED indices should start at zero. Cells without an LED should be empty.
      <Input.TextArea rows={7} value={layoutText} onChange={(e) => {
        setLayoutText(e.currentTarget.value);
      }} />
      <Space.Compact>
        <Button size='small' onClick={() => {
          try {
            const ledMap = parseLayoutText(layoutText);
            onChange(ledMap);
            message.success(`Parsed layout with ${ledMap.leds.length.toLocaleString()} LEDs`);
          } catch (error) {
            message.error((error as Error).message);
          }
        }
        }>Parse Layout</Button>
        <Button size='small'>Copy</Button>
      </Space.Compact>
    </>
  );
}
