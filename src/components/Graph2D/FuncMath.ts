import Canvas from "../../modules/Canvas/Canvas";
import { TWIN2D } from "../../modules/Canvas/TWIN";

export default class FuncMath {

  funcMath: { WIN: TWIN2D; canvas: Canvas }

  constructor(funcMath: { WIN: TWIN2D; canvas: Canvas }) {
    this.funcMath = funcMath;
  }

  getDerivative(f: Function, x0: number, dx = 0.00001) { return (f(x0 + dx) - f(x0)) / dx; }

  printTangent(f: Function, x0: number) {
    const k = this.getDerivative(f, x0);
    let b = f(x0) - k * x0;
    let x1 = this.WIN.LEFT;
    let x2 = this.WIN.LEFT + this.WIN.WIDTH;
    let y = k * x1 + b;
    let y2 = k * x2 + b;
    this.canvas.line(x1, y, x2, y2, 'black', 1, (5));
  }

  getIntegral(f, a: number, b: number, n = 100) {
    const dx = (b - a) / n;
    let x = a;
    let s = 0;
    while (x < b) {
      s += ((f(x) + f(x + dx)) / 2) * dx;
      x += dx
    }
    return s;
  }

  getZero(f, a = 0, b = 0, eps = 0): number | null | undefined {
    if (f(a) * f(b) > 0) {
      return null;
    }
    if (Math.abs(f(a) - f(b)) <= eps) {
      return (a + b) / 2;
    }
    var half = (a + b) / 2
    if (f(a) * f(half) <= 0) {
      return this.getZero(f, a, half, eps);
    }
    if ((f(half) * f(b)) <= 0) {
      return this.getZero(f, half, b, eps);
    }
  }

  getCross(f, g, a = 0, b = 0, eps = 0): number | null | undefined {
    if ((f(a) - g(a)) * (f(b) - g(b)) > 0) {
      return null;
    }
    if (Math.abs(f(a) - g(a)) <= eps) {
      return a
    }
    var half = (a + b) / 2
    if ((f(a) - g(a)) * (f(half) - g(half)) <= 0) {
      return this.getCross(f, g, a, half, eps);
    }
    if ((f(half) - g(half)) * (f(b) - g(b)) <= 0) {
      return this.getCross(f, g, half, b, eps);
    }
  }
}






