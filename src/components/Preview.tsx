import { LedMap } from "../input/layout";
import Canvas from "./Canvas";
import { DrawFunction } from "./CanvasHook";

export default function Preview({ ledMap, onFpsChange }: { ledMap?: LedMap, onFpsChange?: (fps: number) => void }) {
  let elapsed = 0;
  let fps = 0;
  let offset = 0;
  const offsetIncrement = 1.0;

  const onDraw: DrawFunction<CanvasRenderingContext2D> = (context, _frameCount, elapsedTime) => {
    elapsed += elapsedTime;

    if (elapsed >= 1_000) {
      fps = 1_000 / elapsedTime;
      elapsed = 0;
      onFpsChange?.(fps);
    }

    if (!ledMap) return;

    const { leds, minX, minY, height, width } = ledMap;
    if (!leds.length) return;

    offset += offsetIncrement;
    if (offset > 255) offset = 0;

    const canvasHeight = context.canvas.height;
    const canvasWidth = context.canvas.width;

    const ledWidth = 10;
    const ledHeight = 10;

    const center = ledWidth / 2;

    console.log({ canvasHeight, canvasWidth, width, height, ledWidth, ledHeight });

    context.globalCompositeOperation = "source-over";
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.fillStyle = "black";
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.globalCompositeOperation = "lighter";

    for (const led of leds) {
      const x = (led.x - minX) * ledWidth;
      const y = (led.y - minY) * ledHeight;

      context.fillStyle = 'red';
      context.beginPath();
      context.ellipse(x + center, y + center, center, center, 0, 0, Math.PI * 2, false);
      context.fill();
    }

    // // draw FPS 
    // context.lineWidth = 1;
    // context.textBaseline = "top";
    // context.textAlign = "left";
    // context.font = `12px monospace`;
    // context.fillStyle = 'white';
    // context.fillText(`${fps.toLocaleString(undefined, { maximumFractionDigits: 1 })} FPS`, 10, 10);
  };

  return (<Canvas<CanvasRenderingContext2D>
    contextType={'2d'}
    draw={onDraw}
    style={{ height: 800, width: 800 }} // TODO: auto resize canvas
  />);
}