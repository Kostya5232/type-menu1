import { useRef } from "react";
import { IFigureParamsProps } from "../FigureParams";
import { Figure } from "../../../../modules/Math3D";
import { IidenticalParam } from "../../../../modules/Math3D/figures/IidenticalParam";
interface IConeParamsProps extends IFigureParamsProps {
    getFigure: (a:string, b:IidenticalParam) => Figure;
    figureName: string;
}
const ConeParams:React.FC<IConeParamsProps> = ({ getFigure, figureName, setScene }) => {
    const refColor = useRef(null);
    const refX = useRef<HTMLInputElement>(null);
    const refY = useRef<HTMLInputElement>(null);
    const refZ = useRef<HTMLInputElement>(null);
    const refR = useRef<HTMLInputElement>(null);
    const refCount = useRef<HTMLInputElement>(null);
    const refAnim = useRef<HTMLInputElement>(null);

    const onChange = () => {
        const color = refColor.current.value;
        const x = refX.current.value - 0;
        const y = refY.current.value - 0;
        const z = refZ.current.value - 0;

        const r = refR.current.value - 0;
        const count = refCount.current.value - 0;
        const animations = refAnim.current.value;
       

        if (color) {
            setScene([getFigure(figureName, { r, count, color,  x, y, z })]);
        }
    };

    return (
        <div>
            <span>Радиус:</span>
            <input ref={refR} onChange={onChange} defaultValue={10}/>
            <br></br>
            <span>Плотность точек: </span>
            <input ref={refCount} onChange={onChange} defaultValue={20}/>
            <br></br>
            <span>Анимации</span>
            <input ref={refAnim} onChange={onChange}/>
            <br></br>
            <span>Выбор цвета: </span>
            <input ref={refColor} type="color" onChange={onChange}/>
            <br></br>
            <span>Координата x: </span>
            <input ref={refX} onChange={onChange}/>
            <br></br>
            <span>Координата y: </span>
            <input ref={refY} onChange={onChange}/>
            <br></br>
            <span>Координата z: </span>
            <input ref={refZ} onChange={onChange}/>
            
        </div>
    );
}
export default ConeParams;
