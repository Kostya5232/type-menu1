import { useRef } from "react";
import { IFigureParamsProps } from "../FigureParams";
import { Figure } from "../../../../modules/Math3D";
import { TCubeOptions } from "../../../../modules/Math3D/figures/Cube";
interface ICubeParamsProps extends IFigureParamsProps {
    getFigure: (a: string, b: TCubeOptions) => Figure;
    figureName: string;
}

const CubeParams: React.FC<ICubeParamsProps> = (props: ICubeParamsProps) => {
    const { getFigure, figureName, setScene } = props;
    const refColor = useRef<HTMLInputElement>(null);
    const refX = useRef<HTMLInputElement>(null);
    const refY = useRef<HTMLInputElement>(null);
    const refZ = useRef<HTMLInputElement>(null);

    const onChange = () => {
        const color = refColor.current?.value;
        const x = Number(refX.current?.value);
        const y = Number(refY.current?.value);
        const z = Number(refZ.current?.value);

        if (color) {
            setScene([getFigure(figureName, { color, x, y, z })]);
        }
    };

    return (
        <div>
            <span>Выбор цвета</span>
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

export default CubeParams;
