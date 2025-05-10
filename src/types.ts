export interface LED {
  index: number;
  x: number;
  y: number;
  angle?: number;
  radius?: number;
  x256?: number;
  y256?: number;
  angle256?: number;
  radius256?: number;
}

export interface LedMap {
  duplicateIndices: number[];
  gaps: number[];
  height: number;
  input: string;
  leds: LED[];
  maxIndex: number;
  maxX: number;
  maxY: number;
  middleX: number;
  middleY: number;
  minIndex: number;
  minX: number;
  minY: number;
  width: number;
}
