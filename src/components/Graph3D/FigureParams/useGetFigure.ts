import {
    Figure,
    Cone,
    Cube,
    Cylinder,
    Ellipsoid,
    EllipticalParabaloid,
    HyperbolicCylinder,
    HyperbolicParaboloid,
    OneWayHyperboloid,
    ParabalidCylinder,
    Sphere,
    Tor,
    TwoWayHyperboloid,
} from "../../../modules/Math3D";

import { TCubeOptions, TConeOptions, TCylinderOptions, TEllipsoidOptions, TEllipticalParabaloidOptions, THyperbolicCylinderOptions, THyperbolicParaboloidOptions, TOneWayHyperboloidOptions, TParabalidCylinderOptions, TSphereOptions, TTorOptions, TTwoWayHyperboloidOptions } from '../../../modules/Math3D/figures'

const useGetFigure = () => {
    return <T>(name: string, params: T) => {
        switch (name) {
            case "Cube":
                return new Cube(params as TCubeOptions);
            case "Sphere":
                return new Sphere(params as TSphereOptions);
            case "Cone":
                return new Cone(params as TConeOptions);
            case "Ellipsoid":
                return new Ellipsoid(params as TEllipsoidOptions);
            case "Tor":
                return new Tor(params as TTorOptions);
            case "HyperbolicParaboloid":
                return new HyperbolicParaboloid(params as THyperbolicParaboloidOptions);
            case "Cylinder":
                return new Cylinder(params as TCylinderOptions);
            case "OneWayHyperboloid":
                return new OneWayHyperboloid(params as TOneWayHyperboloidOptions);
            case "TwoWayHyperboloid":
                return new TwoWayHyperboloid(params as TTwoWayHyperboloidOptions);
            case "EllipticalParabaloid":
                return new EllipticalParabaloid(params as TEllipticalParabaloidOptions);
            case "ParabalidCylinder":
                return new ParabalidCylinder(params as TParabalidCylinderOptions);
            case "HyperbolicCylinder":
                return new HyperbolicCylinder(params as THyperbolicCylinderOptions);
            default:
                return new Figure();
        }
    };
};

export default useGetFigure;
