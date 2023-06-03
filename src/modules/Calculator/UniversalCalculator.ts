import { Complex, Vector, Matrix, Polynomial, Member } from "./entitites";
import { ComplexCalculator, VectorCalculator, MatrixCalculator } from "./calculators";
import PolynomialCalculator from "./PolynomialCalculator";
import ICalculator from "./ICalculatror";
import AnyType from "./entitites/AnyType";

export enum EOperand {
    add = "add",
    sub = "sub",
    mult = "mult",
    div = "div",
    prod = "prod",
    pow = "pow",
    one = "one",
    zero = "zero",
}

export default class UniversalCalculator implements ICalculator<AnyType> {
    complex(re?: number, im?: number): AnyType {
        return new Complex(re, im);
    }
    vector(values?: AnyType[]): Vector {
        return new Vector(values);
    }
    matrix(values?: AnyType[][]): Matrix {
        return new Matrix(values);
    }
    member(value?: number, power?: number): Member {
        return new Member(value, power);
    }
    polynomial(members: Member[] = []): Polynomial {
        return new Polynomial(members);
    }

    getComplex(str: string): AnyType {
        const arr = str.split("i");
        if (arr.length === 2) {
            const ch = arr[0].substring(arr[0].length - 1);
            arr[0] = arr[0].slice(0, -1);
            arr[1] = arr[1] ? arr[1] : "1";

            if (ch === "-") {
                arr[1] = ch + arr[1];
            }
            if (arr[0]) {
                return new Complex(Number(arr[0]), Number(arr[1]));
            }
            return new Complex(0, Number(arr[1]));
        }
        return new Complex(Number(str));
    }

    getVector(str: string): AnyType {
        const arr = str.slice(1, str.length - 1).split(",");
        return new Vector(arr.map((elem: string) => this.getEntity(elem)));
    }

    getMatrix(str: string): AnyType {
        const arr: string[] = str.slice(1, str.length - 1).split("|");
        return new Matrix(arr.map((elems: string) => elems.split(";").map((elem) => this.getEntity(elem))));
    }

    getMember(str: string): Member {
        if (str) {
            const arr = str.split("x");
            if (arr.length === 1) return new Member(Number(arr[0]));
            arr[0] = arr[0].replaceAll("*", "");
            arr[1] = arr[1].replaceAll("^", "");
            if (arr[0] === "-") arr[0] = "-1";
            if (arr[0] === "") arr[0] = "1";
            if (arr[1] === "") arr[1] = "1";
            return new Member(Number(arr[0]), Number(arr[1]));
        }
        return new Member();
    }

    getPolynomial(str: string): Polynomial {
        str = str.replaceAll(" ", "").replaceAll("\n", "");
        if (str) {
            const arr = str.split("+");
            const arr2 = arr.map((elem) => elem.split("-"));
            for (let i = 0; i < arr2.length; i++) {
                arr2[i] = arr2[i].map((elem, index) => (elem && index ? `-${elem}` : elem));
            }
            const arr3 = arr2.reduce((S, arr) => S.concat(arr), []);
            return new Polynomial(arr3.map((elem) => this.getMember(elem)));
        }
        return new Polynomial();
    }

    getEntity(str: string): AnyType {
        str = str.replaceAll(" ", "").replaceAll("\n", "");
        if (str.includes('x')) {
            return this.getPolynomial(str);
        }
        if (str.includes("[")) {
            return this.getMatrix(str);
        }
        if (str.includes("(")) {
            return this.getVector(str);
        }
        if (str.includes("i")) {
            return this.getComplex(str);
        }
        return this.complex(Number(str), 0);
    }

    [EOperand.add](a: AnyType, b: AnyType): AnyType {
        return this.get(a).add(a, b);
    }

    [EOperand.sub](a: AnyType, b: AnyType): AnyType {
        return this.get(a).sub(a, b);
    }

    [EOperand.mult](a: AnyType, b: AnyType): AnyType {
        return this.get(a).mult(a, b);
    }

    [EOperand.div](a: AnyType, b: AnyType): AnyType | null {
        return this.get(a).div(a, b);
    }

    [EOperand.prod](p: number, a: AnyType): AnyType {
        return this.get(a).prod(p, a);
    }

    [EOperand.pow](a: AnyType, p: number): AnyType {
        return this.get(a).pow(a, p);
    }

    [EOperand.zero](elem: AnyType): AnyType {
        if (elem instanceof Vector) {
            return this.get(elem).zero(elem.values.length); 
        }
        if (elem instanceof Matrix) {
            return this.get(elem).zero(elem.values[0].length);
        }
        return this.get().zero();
    }

    [EOperand.one](elem: AnyType): AnyType {
        if (elem instanceof Vector) {
            return this.get(elem).one(elem.values.length); 
        }
        if (elem instanceof Matrix) {
            return this.get(elem).one(elem.values[0].length);
        }
        return this.get().one();
    }

    get(elem?: AnyType): ICalculator<AnyType> {
        if (elem instanceof Matrix) 
            return new MatrixCalculator(this.get(elem.values[0][0]));
        if (elem instanceof Vector) 
            return new VectorCalculator(this.get(elem.values[0]));
        if (elem instanceof Polynomial) 
            return new PolynomialCalculator();
        return new ComplexCalculator();
    }
}
