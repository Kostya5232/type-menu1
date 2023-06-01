import { useState, useCallback, ChangeEvent } from "react";
import useGetFigure from "./useGetFigure";
import {
    ConeParams,
    CubeParams,
    CylinderParams,
    EllipsoidParams,
    EllipticalParabaloidParams,
    HyperbolicParaboloidParams,
    HyperbolicCylinderParams,
    OneWayHyperboloidParams,
    ParabalidCylinderParams,
    SphereParams,
    TorParams,
    TwoWayHyperboloidParams,
} from "./figures";
import { TScene } from "../Graph3D";

export interface IFigureParamsProps {
    setScene: (scene: TScene) => void;
}

const FigureParams: React.FC<IFigureParamsProps> = (props: IFigureParamsProps) => {
    const { setScene } = props;
    const [figureName, setFigureName] = useState<string | null>(null);

    const getFigure = useGetFigure();

    const selectFigureHandler = useCallback(
        (event: ChangeEvent<HTMLSelectElement>) => {
            const scene = [getFigure(event.target.value)];
            setScene(scene);
            setFigureName(event.target.value);
        },
        [getFigure, setScene, setFigureName]
    );

    return (
        <div className="selectFigur" id="selectFigur">
            <select id="figures" onChange={selectFigureHandler}>
                <option className="figur" value="Cube">
                    Куб
                </option>
                <option className="figur" value="Sphere">
                    Сфера
                </option>
                <option className="figur" value="Cone">
                    Конус
                </option>
                <option className="figur" value="Ellipsoid">
                    Элипсоид
                </option>
                <option className="figur" value="Tor">
                    Тор
                </option>
                <option className="figur" value="HyperbolicParaboloid">
                    Седло
                </option>
                <option className="figur" value="Cylinder">
                    Цилиндр
                </option>
                <option className="figur" value="OneWayHyperboloid">
                    Однополосый гиперболоид
                </option>
                <option className="figur" value="TwoWayHyperboloid">
                    Двухполосый гиперболоид
                </option>
                <option className="figur" value="EllipticalParabaloid">
                    Эллиптический гиперболоид
                </option>
                <option className="figur" value="ParabalidCylinder">
                    Параболический цилиндр
                </option>
                <option className="figur" value="HyperbolicCylinder">
                    Гипербалический цилиндр
                </option>
                <option className="figur" value="SolarSystem">
                    Солнечная система
                </option>
            </select>
            {figureName === "Cube" ? (
                <CubeParams getFigure={getFigure} figureName={figureName} setScene={setScene} />
            ) : figureName === "Sphere" ? (
                <SphereParams getFigure={getFigure} figureName={figureName} setScene={setScene} />
            ) : figureName === "Cone" ? (
                <ConeParams getFigure={getFigure} figureName={figureName} setScene={setScene} />
            ) : figureName === "Cylinder" ? (
                <CylinderParams getFigure={getFigure} figureName={figureName} setScene={setScene} />
            ) : figureName === "Ellipsoid" ? (
                <EllipsoidParams getFigure={getFigure} figureName={figureName} setScene={setScene} />
            ) : figureName === "EllipticalParabaloid" ? (
                <EllipticalParabaloidParams getFigure={getFigure} figureName={figureName} setScene={setScene} />
            ) : figureName === "HyperbolicCylinder" ? (
                <HyperbolicCylinderParams getFigure={getFigure} figureName={figureName} setScene={setScene} />
            ) : figureName === "HyperbolicParaboloid" ? (
                <HyperbolicParaboloidParams getFigure={getFigure} figureName={figureName} setScene={setScene} />
            ) : figureName === "OneWayHyperboloid" ? (
                <OneWayHyperboloidParams getFigure={getFigure} figureName={figureName} setScene={setScene} />
            ) : figureName === "ParabalidCylinder" ? (
                <ParabalidCylinderParams getFigure={getFigure} figureName={figureName} setScene={setScene} />
            ) : figureName === "Tor" ? (
                <TorParams getFigure={getFigure} figureName={figureName} setScene={setScene} />
            ) : figureName === "TwoWayHyperboloid" ? (
                <TwoWayHyperboloidParams getFigure={getFigure} figureName={figureName} setScene={setScene} />
            ) : (
                <></>
            )}
        </div>
    );
};

export default FigureParams;
