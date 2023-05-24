import { Complex, Vector, Matrix, Polynomial } from "./entitites";
import { ComplexCalculator, VectorCalculator, MatrixCalculator } from "./calculators";
import PolynomialCalculator from "./PolynomialCalculator";



export default class UniversalCalculator {
  complex(re:number, im:number) {
    return new Complex(re, im);
  }
  vector(values:number[]):Vector {
    return new Vector(values);
  }
  matrix(values:number[][]):Matrix {
    return new Matrix(values);
  }

  getComplex(str:string):Complex {
    const arr = str.split('i');
    if (arr.length === 2) {
      const ch = arr[0].substring(arr[0].length - 1);
      arr[0] = arr[0].slice(0, -1);
      arr[1] = arr[1] ? arr[1] : '1';

      if (ch === '-') {
        arr[1] = ch + arr[1];
      }
      if (arr[0]) {
        return new Complex(Number(arr[0]), Number(arr[1]));
      }
      return new Complex(0, Number(arr[1]));
    }
    return new Complex(Number(str));
  }

  getVector(str:string):Vector {
    const arr = str.slice(1, str.length - 1).split(',');
    return new Vector(arr.map((elem:string) => this.getEntity(elem)));
  }

  getMatrix(str:string):Matrix {
    const arr:string[] = str.slice(1, str.length - 1).split('|');
    return new Matrix(arr.map((elems:string) => elems.split(';').map((elem) => this.getEntity(elem))));
  }

  getEntity(str:string): number | Vector | Matrix | Complex {
    str = str.replaceAll(' ', '').replaceAll('\n', '');
    if (str.includes('[')) {
      return this.getMatrix(str);
    }
    if (str.includes('(')) {
      return this.getVector(str);
    }
    if (str.includes('i')) {
      return this.getComplex(str);
    }
    return this.complex(Number(str), 0);
  }

  add(a:Matrix | Vector | Polynomial | Complex, b:number) {
    return this.get(a).add(a, b);
  }

  sub(a:Matrix | Vector | Polynomial | Complex, b:number) {
    return this.get(a).sub(a, b);
  }

  mult(a:Matrix | Vector | Polynomial | Complex, b:number) {
    return this.get(a).mult(a, b);
  }

  div(a:Matrix | Vector | Polynomial | Complex, b:number) {
    return this.get(a).div(a, b);
  }

  prod(p:Complex, a:Complex) {
    return this.get(a).prod(p, a);
  }

  pow(a:number, p:Complex) {
    return this.get(a).pow(a, p);
  }

  zero(elem:number) {
    const type = elem ? elem.constructor.name : null;
    switch (type) {
      case 'Vector':
        return this.get(this.vector()).zero(elem.values.length);
      case 'Matrix':
        return this.get(this.matrix()).zero(elem.values.length);
      default:
        return this.get(this.complex()).zero();
    }
  }

  one(elem: Matrix | Vector | Complex): Matrix | Vector | Complex {
    const type = elem ? elem.constructor.name : null;
    switch (type) {
      case 'Vector':
        return this.get(this.vector()).one(elem.values.length);
      case 'Matrix':
        return this.get(this.matrix()).one(elem.values.length);
      default:
        return this.get(this.complex()).one();
    }
  }

  get(elem: Matrix | Vector | Polynomial | Complex): MatrixCalculator | VectorCalculator | PolynomialCalculator | ComplexCalculator {
    if (elem instanceof Matrix) return new MatrixCalculator(this.get(elem.values[0][0]));
    if (elem instanceof Vector) return new VectorCalculator(this.get(elem.values[0]));
    if (elem instanceof Polynomial) return new PolynomialCalculator(this.get(elem.values[0]));
    return new ComplexCalculator();
  }
}

