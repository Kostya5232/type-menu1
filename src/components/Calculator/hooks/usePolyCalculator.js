import UniversalCalculator, { PolynomialCalculator } from "../../../modules/Calculator";

export default function usePolyCalculator(refA, refB, refX, refC) {
    const calc = new UniversalCalculator();
    const calcPoly = new PolynomialCalculator();

    return (operand) => {
        if (refA && refB && refX && refC) {
            if (operand === "point") {
                const A = refA.current.value;
                const C = refX.current.value;
                refC.current.value = calcPoly.getPolynomial(A)
                    .getValue(calc.getEntity(C)).toString();
            } else {
                const A = refA.current.value;
                const B = refB.current.value;
                refC.current.value = calcPoly[operand](
                    calcPoly.getPolynomial(A),
                    calcPoly.getPolynomial(B)
                ).toString();
            }
        }
    };
}
