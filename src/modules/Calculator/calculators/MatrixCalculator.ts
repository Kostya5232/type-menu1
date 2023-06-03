import ICalculator from "../ICalculatror";
import { Matrix } from "../entitites";
import AnyType from "../entitites/AnyType";

export default class MatrixCalculator implements ICalculator<Matrix> {

    calc: ICalculator<AnyType>;

    constructor(calc: ICalculator<AnyType>) {
        this.calc = calc;
    }

    div() {
        return null;
    }

    add(a: Matrix, b: Matrix): Matrix {
        return new Matrix(a.values.map((arr, i) =>
            arr.map((elem, j) => this.calc.add(elem, b.values[i][j]))));
    }

    sub(a: Matrix, b: Matrix): Matrix {
        return new Matrix(a.values.map((arr, i) =>
            arr.map((elem, j) => this.calc.sub(elem, b.values[i][j]))));
    }

    mult(a: Matrix, b: Matrix): Matrix {
        const values: AnyType[][] = [];
        for (let i = 0; i < a.values.length; i++) {
            values.push([]);
            for (let j = 0; j < a.values[i].length; j++) {
                let s: AnyType = this.zero(a.values.length);
                for (let k = 0; k < a.values[i].length; k++) {
                    s = this.calc.add(s, this.calc.mult(a.values[i][k], b.values[k][j]));
                }
                values[i][j] = s;
            }
        }
        return new Matrix(values);
    }

    prod(p: number, a: Matrix): Matrix {
        return new Matrix(a.values.map((arr) => arr.map((elem) => this.calc.mult(elem, p))));
    }

    pow(a: Matrix, p: number): Matrix {
        let c = this.one(a.values.length);
        for (let i = 0; i < p; i++) {
            c = this.mult(c, a);
        }

        return c;
    }

    one(length = 0): Matrix {
        const values: AnyType[][] = [];
        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = i === j ? this.calc.one(length) : this.calc.zero(length);
            }
        }
        return new Matrix(values);
    }

    zero(length = 0): Matrix {
        const values: AnyType[][] = [];
        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = this.calc.zero(length);
            }
        }
        return new Matrix(values);
    }
}
