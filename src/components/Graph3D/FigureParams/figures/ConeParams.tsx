import { useRef } from "react";
import { IFigureParamsProps } from "../FigureParams";
import { Figure } from "../../../../modules/Math3D";
import { TConeOptions } from "../../../../modules/Math3D/figures/Cone";
interface IConeParamsProps extends IFigureParamsProps {
    getFigure: (a: string, b: TConeOptions) => Figure;
    figureName: string;
}
const ConeParams: React.FC<IConeParamsProps> = ({ getFigure, figureName, setScene }) => {
    const refColor = useRef<HTMLInputElement>(null);
    const refX = useRef<HTMLInputElement>(null);
    const refY = useRef<HTMLInputElement>(null);
    const refZ = useRef<HTMLInputElement>(null);
    const refR = useRef<HTMLInputElement>(null);
    const refCount = useRef<HTMLInputElement>(null);

    const onChange = () => {
        const r = Number(refR.current?.value);
        const count = Number(refCount.current?.value);
        const color = refColor.current?.value;
        const x = Number(refX.current?.value);
        const y = Number(refY.current?.value);
        const z = Number(refZ.current?.value);

        if (color) {
            setScene([getFigure(figureName, { r, count, color, x, y, z })]);
        }
    };

    return (
        <div>
            <span>Радиус:</span>
            <input ref={refR} onChange={onChange} defaultValue={10} />
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
export default ConeParams;
