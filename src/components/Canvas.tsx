import { CSSProperties } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import useCanvas, { DrawFunction } from './CanvasHook';

// Adapted from React Canvas TS by sardusmatt: https://github.com/sardusmatt/react-canvas-ts

export default function Canvas<T extends RenderingContext>({ contextType, draw, ...rest }: {
  contextType: '2d' | 'webgl' | 'webgl2',
  draw: DrawFunction<T>,
  style?: CSSProperties
}) {
  const canvasRef = useCanvas<T>({ contextType, draw });

  return (
    <TransformWrapper>
      <TransformComponent contentStyle={{ width: '100%', height: '100%' }} wrapperStyle={{ width: '100%', height: '100%' }}>
        <canvas ref={canvasRef} {...rest} />
      </TransformComponent>
    </TransformWrapper>
  );
};
