import { Figure, Point, Edge, Polygon } from "../entities";

class Cube extends Figure {
    constructor(options = { color : "#ff0000", animations : "" , x : 0, y : 0, z : 0 }) {
        const { color , animations  , x , y , z} = options;
        const points:Point[] = [
            new Point(10 + x, 10 + y, 10 + z),
            new Point(10 + x, -10 + y, 10 + z),
            new Point(-10 + x, 10 + y, 10 + z),
            new Point(10 + x, 10 + y, -10 + z),
            new Point(-10 + x, 10 + y, -10 + z),
            new Point(-10 + x, -10 + y, 10 + z),
            new Point(-10 + x, -10 + y, -10 + z),
            new Point(10 + x, -10 + y, -10 + z),
        ];
        const edges:Edge[] = [
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
        const polygons:Polygon[] = [
            new Polygon([0, 1, 5, 2], color),
            new Polygon([7, 6, 4, 3], color),
            new Polygon([7, 6, 5, 1], color),
            new Polygon([2, 4, 6, 5], color),
            new Polygon([0, 3, 7, 1], color),
            new Polygon([0, 3, 4, 2], color),
        ];
        super(points, edges, polygons, animations);
    }
}

export default Cube;
