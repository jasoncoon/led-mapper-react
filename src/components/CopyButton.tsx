import { CheckOutlined, CopyOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";

export default function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState<boolean>(false);

  return (
    <Button size='small' onClick={async () => {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3_000);
    }}>
      {copied ? <>
        Copied <CheckOutlined />
      </> : <>
        Copy <CopyOutlined />
      </>}
    </Button>
  );
}