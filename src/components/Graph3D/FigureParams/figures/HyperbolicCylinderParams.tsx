import { useRef } from "react";
import { IFigureParamsProps } from "../FigureParams";
import { Figure } from "../../../../modules/Math3D";
import { THyperbolicCylinderOptions } from "../../../../modules/Math3D/figures/HyperbolicCylinder";

interface IHyperbolicCylinderParamsProps extends IFigureParamsProps {
    getFigure: (a: string, b: THyperbolicCylinderOptions) => Figure;
    figureName: string;
}
const HyperbolicCylinderParams: React.FC<IHyperbolicCylinderParamsProps> = ({ getFigure, figureName, setScene }) => {
    const refColor = useRef<HTMLInputElement>(null);
    const refX = useRef<HTMLInputElement>(null);
    const refY = useRef<HTMLInputElement>(null);
    const refZ = useRef<HTMLInputElement>(null);
    const refA = useRef<HTMLInputElement>(null);
    const refB = useRef<HTMLInputElement>(null);
    const refCount = useRef<HTMLInputElement>(null);

    const onChange = () => {
        const a = Number(refA.current?.value);
        const b = Number(refB.current?.value);
        const count = Number(refCount.current?.value);
        const color = refColor.current?.value;
        const x = Number(refX.current?.value);
        const y = Number(refY.current?.value);
        const z = Number(refZ.current?.value);

        if (color) {
            setScene([getFigure(figureName, { a, b, count, color, x, y, z })]);
        }
    };

    return (
        <div>
            <span>Коэффициент а: </span>
            <input ref={refA} onChange={onChange} defaultValue={10} />
            <br></br>
            <span>Коэффициент b: </span>
            <input ref={refB} onChange={onChange} defaultValue={10} />
            <br></br>
            <span>Плотность точек: </span>
            <input ref={refCount} onChange={onChange} defaultValue={20} />
            <br></br>
            <span>Выбор цвета: </span>
            <input ref={refColor} type="color" onChange={onChange} />
            <br></br>
            <span>Координата x: </span>
            <input ref={refX} onChange={onChange} />
            <br></br>
            <span>Координата y: </span>
            <input ref={refY} onChange={onChange} />
            <br></br>
            <span>Координата z: </span>
            <input ref={refZ} onChange={onChange} />
        </div>
    );
};
export default HyperbolicCylinderParams;
