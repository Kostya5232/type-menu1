import { Figure, Point, Edge, Polygon } from "../entities";
import { IidenticalParam } from "./IidenticalParam";
export interface TOneWayHyperboloidOptions extends IidenticalParam {
    a: number;
    b: number;
    c: number;
    count: number

}
class OneWayHyperboloid extends Figure {
    constructor(options: TOneWayHyperboloidOptions) {
        super()
        const { a = 2, b = 3, c = 4, count = 20, color = "lightgreen", x = 0, y = 0, z = 0 } = options;
        const points: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = [];

        for (let i = -count / 3; i <= count / 3; i++) {
            let T = (2 * Math.PI / count) * i
            for (let j = 0; j < count; j++) {
                const p = (2 * Math.PI) / count * j
                points.push(new Point(
                    a * Math.cosh(T) * Math.cos(p) + x,
                    c * Math.sinh(T) + y,
                    b * Math.cosh(T) * Math.sin(p) + z
                ));

            }
        }

        for (let i = 0; i < points.length; i++) {
            if (i + 1 < points.length && (i + 1) % count !== 0) {
                edges.push(new Edge(i, i + 1));
            } else if (i + 1 >= count && (i + 1) % count === 0) {
                edges.push(new Edge(i, i + 1 - count));
            }
        }

        for (let i = 0; i < points.length; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
            } else if (i + count < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color))
            }
        }





        this.points = points
        this.edges = edges
        this.polygons = polygons
    }
}

export default OneWayHyperboloid;
