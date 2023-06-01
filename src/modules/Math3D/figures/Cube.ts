import { Figure, Point, Edge, Polygon } from "../entities";
import { IidenticalParam } from "./IidenticalParam";

 export interface TCubeOptions extends IidenticalParam {}

class Cube extends Figure {
    constructor(options: TCubeOptions) {
        super();
        const { color = "#ff0000", x = 0, y = 0, z = 0 } = options;
        this.points = [
            new Point(10 + x, 10 + y, 10 + z),
            new Point(10 + x, -10 + y, 10 + z),
            new Point(-10 + x, 10 + y, 10 + z),
            new Point(10 + x, 10 + y, -10 + z),
            new Point(-10 + x, 10 + y, -10 + z),
            new Point(-10 + x, -10 + y, 10 + z),
            new Point(-10 + x, -10 + y, -10 + z),
            new Point(10 + x, -10 + y, -10 + z),
        ];
        this.edges = [
            new Edge(0, 1),
            new Edge(0, 2),
            new Edge(0, 3),
            new Edge(4, 2),
            new Edge(4, 3),
            new Edge(5, 1),
            new Edge(5, 2),
            new Edge(6, 5),
            new Edge(6, 4),
            new Edge(7, 6),
            new Edge(7, 3),
            new Edge(7, 1),
        ];
        this.polygons = [
            new Polygon([0, 1, 5, 2], color),
            new Polygon([7, 6, 4, 3], color),
            new Polygon([7, 6, 5, 1], color),
            new Polygon([2, 4, 6, 5], color),
            new Polygon([0, 3, 7, 1], color),
            new Polygon([0, 3, 4, 2], color),
        ];
    }
}

export default Cube;
