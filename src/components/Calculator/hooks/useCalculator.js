import UniversalCalculator from "../../../modules/Calculator";

export default function useCalculator(refA, refB, refC) {
    const calc = new UniversalCalculator();

    return (operand) => {
        if (refA && refB && refC) {
            const A = refA.current.value;
            const B = refB.current.value;
            refC.current.value = calc[operand](
                calc.getEntity(A),
                calc.getEntity(B)
            ).toString();
        }
    };
}
