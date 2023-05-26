import UniversalCalculator, { PolynomialCalculator } from "../../../modules/Calculator";

export default function usePolyCalculator(refA: React.RefObject<HTMLInputElement>, refB:React.RefObject<HTMLInputElement>, refX:React.RefObject<HTMLInputElement>, refC:React.RefObject<HTMLInputElement>) {
    const calc:UniversalCalculator = new UniversalCalculator();
    const calcPoly:PolynomialCalculator = new PolynomialCalculator();

    return (operand:string) => {
        if (refA.current && refB.current && refX.current && refC.current) {
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
