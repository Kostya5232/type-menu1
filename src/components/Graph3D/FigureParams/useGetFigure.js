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

const useGetFigure = () => {
    return (name, params) => {
        switch (name) {
            case "Cube":
                return new Cube(params);
            case "Sphere":
                return new Sphere(params);
            case "Cone":
                return new Cone(params);
            case "Ellipsoid":
                return new Ellipsoid(params);
            case "Tor":
                return new Tor(params);
            case "HyperbolicParaboloid":
                return new HyperbolicParaboloid(params);
            case "Cylinder":
                return new Cylinder(params);
            case "OneWayHyperboloid":
                return new OneWayHyperboloid(params);
            case "TwoWayHyperboloid":
                return new TwoWayHyperboloid(params);
            case "EllipticalParabaloid":
                return new EllipticalParabaloid(params);
            case "ParabalidCylinder":
                return new ParabalidCylinder(params);
            case "HyperbolicCylinder":
                return new HyperbolicCylinder(params);
            default:
                return new Figure();
        }
    };
};

export default useGetFigure;
