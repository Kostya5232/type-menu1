import { useRef } from "react";
export default function ConeParams({ getFigure, figureName, setScene }) {
    const refColor = useRef(null);
    const refX = useRef(null);
    const refY = useRef(null);
    const refZ = useRef(null);
    const refR = useRef(null);
    const refCount = useRef(null);
    const refAnim = useRef(null);

    const onChange = () => {
        const color = refColor.current.value;
        const x = refX.current.value - 0;
        const y = refY.current.value - 0;
        const z = refZ.current.value - 0;

        const r = refR.current.value - 0;
        const count = refCount.current.value - 0;
        const animations = refAnim.current.value;
       

        if (color) {
            setScene([getFigure(figureName, { r, count, color, animations, x, y, z })]);
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
