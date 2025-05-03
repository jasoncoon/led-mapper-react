import { CSSProperties } from 'react';
import useCanvas, { DrawFunction } from './CanvasHook';

// Adapted from React Canvas TS by sardusmatt: https://github.com/sardusmatt/react-canvas-ts

export default function Canvas<T extends RenderingContext>({ contextType, draw, ...rest }: {
  contextType: '2d' | 'webgl' | 'webgl2',
  draw: DrawFunction<T>,
  width?: number,
  height?: number,
  style?: CSSProperties
}) {
  const canvasRef = useCanvas<T>({ contextType, draw });

  return (
    <canvas ref={canvasRef} {...rest}></canvas>
  );
};
