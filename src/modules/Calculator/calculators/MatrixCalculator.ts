import { Matrix, Complex, Vector, Polynomial } from "../entitites";
import ComplexCalculator from "./ComplexCalculator";

export default class MatrixCalculator {

    

    calc:ComplexCalculator;

    constructor(calc:ComplexCalculator = new ComplexCalculator()) {
        this.calc = calc;
    }

    add(a:Complex[], b:Complex[]):Matrix {
        return new Matrix(a.values.map((arr:number[], i:number) => arr.map((elem, j:number) => this.calc.add(elem, b.values[i][j]))));
    }

    sub(a:Complex[], b:Complex[]):Matrix {
        return new Matrix(a.values.map((arr:number[], i:number) => arr.map((elem:number, j:number) => elem - b.values[i][j])));
    }

    mult(a:Complex[], b:Complex[]):Matrix {
        let values:number[][] = [];
        for (let i = 0; i < a.values.length; i++) {
            values.push([]);
            for (let j = 0; j < a.values[i].length; j++) {
                let s:Complex  = new Complex(0, 0);
                for (let k = 0; k < a.values[i].length; k++) {
                    s = this.calc.add(s, this.calc.mult(a.values[i][k], b.values[k][j]));
                }
                values[i][j] = s;
            }
        }
        return new Matrix(values);
    }

    prod(p:Complex, a:Complex[]) {
        return new Matrix(a.values.map((arr:number) => arr.map((elem: Matrix & Vector & Polynomial & Complex) => this.calc.mult(elem, p))));
    }

    pow(a:Complex[][], p:number) {
        let c = this.one(a.values.length, a.values[0][0]);
        for (let i = 0; i < p; i++) {
            c = this.mult(c, a);
        }

        return c;
    }

    one(length:number) {
        const values:number[][] = [];
        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = i === j ? this.calc.one() : this.calc.zero();
            }
        }
        return new Matrix(values);
    }

    zero(length:number) {
        const values:Complex[][] = [];
        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = this.calc.zero();
            }
        }
        return new Matrix(values);
    }
}
