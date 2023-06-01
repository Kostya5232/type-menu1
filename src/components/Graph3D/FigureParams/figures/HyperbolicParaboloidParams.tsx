import { useRef } from "react";
import { Figure } from "../../../../modules/Math3D";
import { IFigureParamsProps } from "../FigureParams";
import { THyperbolicParaboloidOptions } from "../../../../modules/Math3D/figures/HyperbolicParaboloid";

interface IHyperbolicParaboloidParamsProps extends IFigureParamsProps {
    getFigure: (a: string, b: THyperbolicParaboloidOptions) => Figure;
    figureName: string;
}

const HyperbolicParaboloidParams: React.FC<IHyperbolicParaboloidParamsProps> = ({ getFigure, figureName, setScene }) => {
    const refColor = useRef<HTMLInputElement>(null);
    const refX = useRef<HTMLInputElement>(null);
    const refY = useRef<HTMLInputElement>(null);
    const refZ = useRef<HTMLInputElement>(null);
    const refP = useRef<HTMLInputElement>(null);
    const refQ = useRef<HTMLInputElement>(null);
    const refCount = useRef<HTMLInputElement>(null);

    const onChange = () => {
        const p = Number(refP.current?.value);
        const q = Number(refQ.current?.value);
        const count = Number(refCount.current?.value);
        const color = refColor.current?.value;
        const x = Number(refX.current?.value);
        const y = Number(refY.current?.value);
        const z = Number(refZ.current?.value);

        if (color) {
            setScene([getFigure(figureName, { p, q, count, color, x, y, z })]);
        }
    };

    return (
        <div>
            <span>Коэффициент p: </span>
            <input ref={refP} onChange={onChange} defaultValue={1} />
            <br></br>
            <span>Коэффициент q: </span>
            <input ref={refQ} onChange={onChange} defaultValue={1} />
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
export default HyperbolicParaboloidParams;
