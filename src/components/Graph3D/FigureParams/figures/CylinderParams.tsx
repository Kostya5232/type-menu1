import { useRef } from "react";
import { IFigureParamsProps } from "../FigureParams";

interface ICylinderParamsProps extends IFigureParamsProps {
    getFigure: () => void;
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
    const refAnim = useRef(null);

    const onChange = () => {
        const color = ref1.current?.value;
        const x = parseFloat(ref2.current?.value as string);
        const y = parseFloat(ref3.current?.value as string);
        const z = ref4.current?.value - 0;

        const r = ref5.current.value - 0;
        const h = ref6.current.value - 0;
        const count = ref7.current.value - 0;
        const animations = refAnim.current.value;


        if (color) {
            setScene([getFigure(figureName, { r, h, count, color, animations,x, y, z })]);
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
            <span>Анимации</span>
            <input ref={refAnim} onChange={onChange}/>
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
