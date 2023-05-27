import Point from './Point';
import Math3D, { ETransform } from '../Math3D';
import Polygon from './Polygon';
import Edge from './Edge';

export type TAnimation = {
  method: ETransform,
  value: number,
  center: Point
}

export default class Figure {
  points: Point[];
  edges: Edge[];
  polygons: Polygon[]
  center: Point;
  animations: TAnimation[];

  constructor(points = [], edges = [], polygons = [], center = new Point()) {
    this.points = points;
    this.edges = edges;
    this.polygons = polygons;
    this.center = center;
    this.animations = [];
  }
  // {method:'rotateOx',value: 0.01,center}
  dropAnimation(): void {
    this.animations = [];
  }

  setAnimation(method: ETransform, value: number, center?: Point): void {
    this.animations.push({ method, value, center: center ? center : this.center });
  }

  doAnimation(math3D: Math3D): void {
    this.animations.forEach((anim: TAnimation) => {
      const T2 = math3D.getTransformMatrix(math3D[anim.method](anim.value));
      const T1 = math3D.getTransformMatrix(
        math3D.move(-anim.center.x, -anim.center.y, -anim.center.z)
      );
      const T3 = math3D.getTransformMatrix(
        math3D.move(anim.center.x, anim.center.y, anim.center.z)
      );

      const matrix = math3D.getTransformMatrix(T1, T2, T3);

      this.points.forEach((point) => {
        math3D.transform(matrix, point);
        math3D.transform(matrix, this.center);
      });
    });
  }
}

