import { Checkbox, Radio, Select, Space } from "antd";
import { useState } from "react";
import { LED, LedMap } from "../types";
import Canvas from "./Canvas";
import { DrawFunction } from "./CanvasHook";

const PatternNames = [
  'rainbow clockwise',
  'rainbow counter-clockwise',
  'rainbow down',
  'rainbow in',
  'rainbow index',
  'rainbow left',
  'rainbow out',
  'rainbow right',
  'rainbow up',
] as const;
type PatternType = typeof PatternNames[number];

export default function Preview({ ledMap }: { ledMap?: LedMap }) {
  const [drawType, setDrawType] = useState<'leds' | 'numbers'>('numbers');
  const [drawFps, setDrawFps] = useState<boolean>(true);
  const [pattern, setPattern] = useState<PatternType>('rainbow index');

  let elapsed = 0;
  let fps = 0;
  let offset = 0;
  const offsetIncrement = 0.005;

  function getFillStyle(pattern: PatternType, led: LED): string {
    if (!ledMap) return 'red';

    const { height, leds, width } = ledMap;
    const { length: ledCount } = leds;

    switch (pattern) {
      case 'rainbow clockwise':
        return `hsl(${(((((led.angle ?? 0) / 360) - offset) % 1) * 360).toString()}, 100%, 50%)`;

      case 'rainbow counter-clockwise':
        return `hsl(${(((((led.angle ?? 0) / 360) + offset) % 1) * 360).toString()}, 100%, 50%)`;

      case 'rainbow down':
        return `hsl(${((((led.y / height) - offset) % 1) * 360).toString()}, 100%, 50%)`;

      case 'rainbow in':
        return `hsl(${(((((led.radius ?? 0) / (width / 2)) + offset) % 1) * 360).toString()}, 100%, 50%)`;

      case 'rainbow left':
        return `hsl(${((((led.x / width) + offset) % 1) * 360).toString()}, 100%, 50%)`;

      case 'rainbow out':
        return `hsl(${(((((led.radius ?? 0) / (width / 2)) - offset) % 1) * 360).toString()}, 100%, 50%)`;

      case 'rainbow right':
        return `hsl(${((((led.x / width) - offset) % 1) * 360).toString()}, 100%, 50%)`;

      case 'rainbow up':
        return `hsl(${((((led.y / height) + offset) % 1) * 360).toString()}, 100%, 50%)`;

      case 'rainbow index':
      default:
        return `hsl(${((((led.index / ledCount) - offset) % 1) * 360).toString()}, 100%, 50%)`;
    }

  }

  const onDraw: DrawFunction<CanvasRenderingContext2D> = (context, _frameCount, elapsedTime) => {
    if (!ledMap) return;

    const { leds, minX, minY, height, width } = ledMap;
    const ledCount = leds.length;
    if (!ledCount) return;

    offset += offsetIncrement;
    if (offset > 1) offset = 0;

    const canvasHeight = context.canvas.height;
    const canvasWidth = context.canvas.width;

    const ledDiameter = Math.min(canvasWidth, canvasHeight) / Math.max(width, height);

    const ledCenter = ledDiameter / 2;

    elapsed += elapsedTime;

    if (elapsed >= 1_000) {
      fps = 1_000 / elapsedTime;
      elapsed = 0;
      // console.log({ canvasHeight, canvasWidth, width, height, ledDiameter, ledCenter });
    }

    context.globalCompositeOperation = "source-over";
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.fillStyle = "black";
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.globalCompositeOperation = "lighter";

    context.font = `${(ledDiameter / 4).toString()}px monospace`;

    for (const led of leds) {
      const fillStyle = getFillStyle(pattern, led);

      const x = (led.x - minX) * ledDiameter;
      const y = (led.y - minY) * ledDiameter;

      context.fillStyle = fillStyle;

      if (drawType === 'leds') {
        context.beginPath();
        context.ellipse(x + ledCenter, y + ledCenter, ledCenter, ledCenter, 0, 0, Math.PI * 2, false);
        context.fill();
      }

      if (drawType === 'numbers') {
        context.fillText(led.index.toFixed(0), x + ledCenter, y + ledCenter);
      }
    }

    // draw FPS 
    if (drawFps) {
      context.lineWidth = 1;
      context.textBaseline = "top";
      context.textAlign = "left";
      context.font = `12px monospace`;
      context.fillStyle = 'white';
      context.fillText(`${fps.toLocaleString(undefined, { maximumFractionDigits: 1 })} FPS`, 10, 10);
    }
  };

  return (
    <Space direction="vertical">
      <Space>
        <Radio.Group
          block
          options={[
            { label: 'LEDs', value: 'leds' },
            { label: 'Numbers', value: 'numbers' },
          ]}
          onChange={(e) => {
            setDrawType(e.target.value as 'leds' | 'numbers');
          }}
          optionType="button"
          size="small"
          value={drawType}
        />
        <Select popupMatchSelectWidth={false} value={pattern} onChange={(value) => { setPattern(value); }}
          options={PatternNames.map(patternName => ({ key: patternName, label: patternName, value: patternName }))} />
        <Checkbox checked={drawFps} onChange={(e) => { setDrawFps(e.target.checked); }}>Show FPS</Checkbox>
      </Space>
      <Canvas<CanvasRenderingContext2D>
        contextType={'2d'}
        draw={onDraw}
        style={{ minHeight: 400, height: 'calc(100% - 32px)', width: '100%' }} // TODO: auto resize canvas
      />
    </Space>
  );
}
