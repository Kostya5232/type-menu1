import { Complex } from '../entitites';

export default class ComplexCalculator {
  add(a:Complex, b:Complex) {
    return new Complex(a.re + b.re, a.im + b.im);
  }

  sub(a:Complex, b:Complex) {
    return new Complex(a.re - b.re, a.im - b.im);
  }

  mult(a:Complex, b:Complex) {
    return new Complex(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
  }

  div(a:Complex, b:Complex) {
    const m = Math.pow(b.re, 2) + Math.pow(b.im, 2);
    return new Complex(
      (a.re * b.re + a.im * b.im) / m,
      (a.im * b.re - a.re * b.im) / m
    );
  }

  prod(p:number, a:Complex) {
    return new Complex(a.re * p, a.im * p);
  }

  pow(a:Complex, p:number) {
    let c = this.one();
    for (let i = 0; i < p; i++) {
      c = this.mult(a, c);
    }
    return c;
  }
  
  one() {
    return new Complex(1);
  }

  zero() {
    return new Complex();
  }
}
