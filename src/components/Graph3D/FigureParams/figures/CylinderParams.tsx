import { useRef } from "react";
import { IFigureParamsProps } from "../FigureParams";
import { Figure } from "../../../../modules/Math3D";

interface ICylinderParamsProps extends IFigureParamsProps {
    getFigure: (a:string, b:IFigureParamsProps) => Figure;
    figureName: string;
}

const CylinderParams: React.FC<ICylinderParamsProps> = (props: ICylinderParamsProps) => {
    const { getFigure, figureName, setScene } = props;
    const ref1 = useRef<HTMLInputElement>(null);
    const ref2 = useRef<HTMLInputElement>(null);
    const ref3 = useRef<HTMLInputElement>(null);
    const ref4 = useRef<HTMLInputElement>(null);
    const ref5 = useRef<HTMLInputElement>(null);
    const ref6 = useRef<HTMLInputElement>(null);
    const ref7 = useRef<HTMLInputElement>(null);

    const onChange = () => {
        const r =Number( ref5.current?.value);
        const h = Number(ref6.current?.value );
        const count = Number(ref7.current?.value);
        const color = ref1.current?.value;
        const x = Number(ref2.current?.value);
        const y = Number(ref3.current?.value);
        const z = Number(ref4.current?.value);


        if (color) {
            setScene([getFigure(figureName, { r, h, count, color,x, y, z })]);
        }
    };

    return (
        <div>
            <span>Радиус:</span>
            <input ref={ref5} onChange={onChange} defaultValue={10} />
            <br></br>
            <span>Высота:</span>
            <input ref={ref6} onChange={onChange} defaultValue={10} />
            <br></br>
            <span>Плотность точек: </span>
            <input ref={ref7} onChange={onChange} defaultValue={20} />
            <br></br>
            <span>Выбор цвета: </span>
            <input ref={ref1} type="color" onChange={onChange} />
            <br></br>
            <span>Координата x: </span>
            <input ref={ref2} onChange={onChange} />
            <br></br>
            <span>Координата y: </span>
            <input ref={ref3} onChange={onChange} />
            <br></br>
            <span>Координата z: </span>
            <input ref={ref4} onChange={onChange} />
        </div>
    );
}

export default CylinderParams;
