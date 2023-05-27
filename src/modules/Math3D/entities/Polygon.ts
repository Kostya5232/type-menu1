import Point from './Point';

export type TRGB = { r: number, g: number, b: number };

export enum EDistance {
  distance = 'distance',
  lumen = 'lumen'
}

export default class Polygon {
  points: number[];
  color: TRGB;
  center: Point;
  R: number;
  figureIndex: number
  [EDistance.distance]: number;
  [EDistance.lumen]: number;

  constructor(points: Array<number> = [], color = '#ff0000') {
    this.figureIndex = 0
    this.points = points;
    this.center = new Point();
    this.distance = 0;
    this.lumen = 1; //[0..1]
    this.R = 1;
    this.color = this.hexToRgb(color);
  }
  hexToRgb(hex: string): TRGB {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
      : {
        r: 0,
        g: 0,
        b: 0,
      };
  }

  rgbToHex(r: number, g: number, b: number): string {
    return `rgb(${r},${g},${b})`;
  }
}
