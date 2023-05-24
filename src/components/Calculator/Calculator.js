import { useRef } from "react";

import useCalculator from "./hooks/useCalculator";
import usePolyCalculator from "./hooks/usePolyCalculator";

import "./Calculator.css";

const Calculator = () => {
    const refA = useRef(null);
    const refB = useRef(null);
    const refC = useRef(null);
    const refPolyA = useRef(null);
    const refPolyB = useRef(null);
    const refPolyC = useRef(null);
    const refPolyD = useRef(null);
    const calc = useCalculator(refA, refB, refC);
    const calcPoly = usePolyCalculator(refPolyA, refPolyB, refPolyC, refPolyD);

    return (
        <div className="calc">
            <div className="Calculator">
                <h1>Калькулятор</h1>
                <div>
                    <textarea ref={refA} className="inputCalc" placeholder="Первое число" />
                    <textarea ref={refB} className="inputCalc" placeholder="Второе число" />
                </div>
                <div>
                    <button className="operand-calc" onClick={() => calc("add")}>add</button>
                    <button className="operand-calc" onClick={() => calc("sub")}>sub</button>
                    <button className="operand-calc" onClick={() => calc("mult")}>mult</button>
                    <button className="operand-calc" onClick={() => calc("div")}>div</button>
                    <button className="operand-calc" onClick={() => calc("prod")}>prod</button>
                    <button className="operand-calc" onClick={() => calc("pow")}>pow</button>
                    <button className="operand-calc" onClick={() => calc("one")}>one</button>
                    <button className="operand-calc" onClick={() => calc("zero")}>zero</button>
                </div>
                <textarea ref={refC} placeholder="Ответ" />
            </div>
            <div className="Polynomial">
                <h1>Полиномы</h1>
                <div>
                    <textarea ref={refPolyA} className="inputCalc" placeholder="Первый полином"></textarea>
                    <textarea ref={refPolyB} className="inputCalc" placeholder="Второй полином"></textarea>
                    <textarea ref={refPolyC} type="number" placeholder="Значение x"></textarea>
                </div>
                <div>
                    <button className="operand-poly" onClick={() => calcPoly("add")}>
                        +
                    </button>
                    <button className="operand-poly" onClick={() => calcPoly("sub")}>
                        -
                    </button>
                    <button className="operand-poly" onClick={() => calcPoly("mult")}>
                        *
                    </button>
                </div>
                <textarea ref={refPolyD} placeholder="Ответ"></textarea>
                <div>
                    <button className="operand-result" onClick={() => calcPoly("point")}>
                        Point
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
