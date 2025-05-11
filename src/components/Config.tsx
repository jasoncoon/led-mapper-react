import { InputNumber, Space } from "antd";
import { useState } from "react";
import { calculateAngleAndRadius } from "../input/coordinates";
import { LedMap } from "../types";

export default function LedMapConfig({ ledMap, onChange }: { ledMap?: LedMap, onChange: (ledMap: LedMap) => void }) {
  const [middleX, setMiddleX] = useState<number | undefined>(ledMap?.middleX);
  const [middleY, setMiddleY] = useState<number | undefined>(ledMap?.middleY);

  function recalculate(ledMap?: LedMap) {
    if (!ledMap) return;

    const { middleX, middleY } = ledMap;

    const { minAngle, maxAngle, minRadius, maxRadius } = calculateAngleAndRadius(
      ledMap.leds,
      middleX,
      middleY
    );
    ledMap.minAngle = minAngle;
    ledMap.maxAngle = maxAngle;
    ledMap.minRadius = minRadius;
    ledMap.maxRadius = maxRadius;
    onChange(ledMap);
  }

  return <Space>
    <span>Center X: </span>
    <InputNumber value={middleX} onChange={(value) => {
      if (ledMap && value !== null) {
        setMiddleX(value);
        ledMap.middleX = value;
        recalculate(ledMap);
      }
    }} />

    <span>Center Y: </span>
    <InputNumber value={middleY} onChange={(value) => {
      if (ledMap && value !== null) {
        setMiddleY(value);
        ledMap.middleY = value;
        recalculate(ledMap);
      }
    }} />
  </Space>;
}