import { useRef } from "react";
import { IFigureParamsProps } from "../FigureParams";
import { Figure } from "../../../../modules/Math3D";
import { TCylinderOptions } from "../../../../modules/Math3D/figures/Cylinder";

interface ICylinderParamsProps extends IFigureParamsProps {
    getFigure: (a: string, b: TCylinderOptions) => Figure;
    figureName: string;
}

const CylinderParams: React.FC<ICylinderParamsProps> = (props: ICylinderParamsProps) => {
    const { getFigure, figureName, setScene } = props;
    const refA = useRef<HTMLInputElement>(null);
    const refB = useRef<HTMLInputElement>(null);
    const refH = useRef<HTMLInputElement>(null);

    const refCount = useRef<HTMLInputElement>(null);
    const refColor = useRef<HTMLInputElement>(null);
    const refX = useRef<HTMLInputElement>(null);
    const refY = useRef<HTMLInputElement>(null);
    const refZ = useRef<HTMLInputElement>(null);

    const onChange = () => {
        const a = Number(refA.current?.value);
        const b = Number(refB.current?.value);
        const h = Number(refH.current?.value);
        const count = Number(refCount.current?.value);
        const color = refColor.current?.value;
        const x = Number(refX.current?.value);
        const y = Number(refY.current?.value);
        const z = Number(refZ.current?.value);

        if (color) {
            setScene([getFigure(figureName, { a,b, h, count, color, x, y, z })]);
        }
    };

    return (
        <div>
            <span>Коэффициент а:</span>
            <input ref={refA} onChange={onChange} defaultValue={10} />
            <br></br>
            <span>Коэффициент b:</span>
            <input ref={refB} onChange={onChange} defaultValue={10} />
            <br></br>

            <span>Высота:</span>
            <input ref={refH} onChange={onChange} defaultValue={10} />
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

export default CylinderParams;
