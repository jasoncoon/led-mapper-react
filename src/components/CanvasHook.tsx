import { useEffect, useRef, useState } from 'react';

// Adapted from React Canvas TS by sardusmatt: https://github.com/sardusmatt/react-canvas-ts

export type DrawFunction<T> = (context: T, frameCount: number, elapsedTime: number) => void;

type ContextType = '2d' | 'webgl' | 'webgl2';

// handle canvas element resize, and pixel density as per https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio#correcting_resolution_in_a_canvas
const resizeCanvas = (canvas: HTMLCanvasElement, contextType: ContextType, forceResize = false): boolean => {
  let resized = false;

  // TODO use a seemingly more accurate method, as described here: https://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html
  const { width, height } = canvas.getBoundingClientRect();

  if (forceResize || canvas.width !== width || canvas.height !== height) {
    const scale = window.devicePixelRatio ? window.devicePixelRatio : 1; // if not present, assume pixel ratio 1
    const context = canvas.getContext(contextType);

    const newWidth = Math.floor(width * scale);
    const newHeight = Math.floor(height * scale);

    if (context) {
      resized = true;
      canvas.width = newWidth;
      canvas.height = newHeight;

      // this call is needed to normalise the coordinate system to use CSS pixels
      if ('scale' in context) {
        context.scale(scale, scale);
      }
    }
  }

  return resized;
}

export default function useCanvas<T extends RenderingContext>({ contextType, draw }: {
  contextType: ContextType,
  draw: DrawFunction<T>;
}) {
  const [firstDraw, setFirstDraw] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasContextRef = useRef<RenderingContext | null>(null);

  useEffect(() => {
    // to provide the frame update to the draw function
    let frameCount = 0;
    // to be able to calculate amount of time passed between draws
    let lastDrawTimestamp: number;
    // to cancel the animation frame request via clean up function
    let animFrameId: number;

    // initialise the context ref, which can only be done once the DOM is ready
    if (canvasRef.current) {
      // the first time we want to force resizing to make sure pixel ratio adjustment is performed
      resizeCanvas(canvasRef.current, contextType, firstDraw);
      setFirstDraw(false);

      canvasContextRef.current = canvasRef.current.getContext(contextType);

      // to progressively update frames
      const updateFrame = (): void => {
        frameCount++;
        if (canvasContextRef.current) {
          const currentTimestamp = new Date().getTime();
          const elapsedTime = lastDrawTimestamp > 0 ? currentTimestamp - lastDrawTimestamp : 0;
          draw(canvasContextRef.current as T, frameCount, elapsedTime);
          lastDrawTimestamp = currentTimestamp;
        }
        animFrameId = window.requestAnimationFrame(updateFrame);
      };

      // start the frame loop as soon as the browser is ready to draw
      requestAnimationFrame(updateFrame);
    }

    // clean up when the component is unmounted
    return (): void => {
      window.cancelAnimationFrame(animFrameId);
    }
  }, [firstDraw, draw, contextType]);

  return canvasRef;
};
