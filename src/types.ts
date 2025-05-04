export interface LED {
  index: number;
  x: number;
  y: number;
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
  rows: number[][];
  width: number;
}
