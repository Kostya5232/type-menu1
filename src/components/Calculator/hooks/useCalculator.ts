import UniversalCalculator from "../../../modules/Calculator";

export default function useCalculator(refA: React.RefObject<HTMLInputElement>, refB: React.RefObject<HTMLInputElement>, refC: React.RefObject<HTMLInputElement>) {
    const calc:UniversalCalculator = new UniversalCalculator();

    return (operand:string) => {
        if (refA.current && refB.current && refC.current) {
            const A = refA.current.value;
            const B = refB.current.value;
            refC.current.value = calc[operand](
                calc.getEntity(A),
                calc.getEntity(B)
            ).toString();
        }
    };
}
