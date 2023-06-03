import { Polynomial, Member } from "./entitites";
import ICalculator from "./ICalculatror";

export enum EPolyOperand {
    add = "add",
    sub = "sub",
    mult = "mult",
    point = "point",
}

export default class PolynomialCalculator implements ICalculator<Polynomial> {

    div() {
        return null;
    }

    prod(p: number, a: Polynomial): Polynomial {
        return a;
    }
    pow(a: Polynomial, p: number): Polynomial {
        return a;
    }
    
    zero(): Polynomial {
        return new Polynomial();
    } 

    one(): Polynomial {
        return new Polynomial([new Member(1, 1)]);
    }

    [EPolyOperand.add](a: Polynomial, b: Polynomial): Polynomial {
        const members: Member[] = [];
        a.poly.forEach((elemA) => {
            const member = b.poly.find((elemB) => elemB.power === elemA.power);
            if (member) {
                members.push(new Member(elemA.value + member.value, elemA.power));
            } else {
                members.push(new Member(elemA.value, elemA.power));
            }
        });
        b.poly.forEach((elemB) => {
            if (!members.find((elem) => elem.power === elemB.power)) {
                members.push(new Member(elemB.value, elemB.power));
            }
        });
        return new Polynomial(members);
    }

    [EPolyOperand.sub](a: Polynomial, b: Polynomial) {
        const members: Member[] = [];
        a.poly.forEach((elemA) => {
            const member = b.poly.find((elemB) => elemB.power === elemA.power);
            if (member) {
                members.push(new Member(elemA.value - member.value, elemA.power));
            } else {
                members.push(new Member(elemA.value, elemA.power));
            }
        });

        b.poly.forEach((elemB) => {
            if (!members.find((elem) => elem.power === elemB.power)) {
                members.push(new Member((-1) * elemB.value, elemB.power));
            }
        });
        return new Polynomial(members);
    }

    [EPolyOperand.mult](a: Polynomial, b: Polynomial): Polynomial {
        let polynomial = new Polynomial([]);
        a.poly.forEach((elemA) => {
            const members: Member[] = [];
            b.poly.forEach((elemB) => {
                members.push(new Member(elemA.value * elemB.value, elemA.power + elemB.power));
            });
            polynomial = this.add(polynomial, new Polynomial(members));
        });
        return polynomial;
    }
}
