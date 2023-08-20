import { Figure, Point, Edge, Polygon } from "../entities";
import { IidenticalParam } from "./IidenticalParam";
export interface TOneWayHyperboloidOptions extends IidenticalParam {
    a: number;
    b: number;
    c: number;
    count: number;
}
class OneWayHyperboloid extends Figure {
    constructor(options: TOneWayHyperboloidOptions) {
        super();
        const { a = 2, b = 3, c = 4, count = 20, color = "lightgreen", x = 0, y = 0, z = 0 } = options;
        const points: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = [];

        for (let i = -count / 3; i <= count / 3; i++) {
            let T = ((2 * Math.PI) / count) * i;
            for (let j = 0; j < count; j++) {
                const p = ((2 * Math.PI) / count) * j;
                points.push(new Point(a * Math.cosh(T) * Math.cos(p) + x, c * Math.sinh(T) + y, b * Math.cosh(T) * Math.sin(p) + z));
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
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color));
            }
        }
        const gradient = [
            "#ff0000",
            "#fd0c00",
            "#fb1900",
            "#f82600",
            "#f53200",
            "#f23e00",
            "#ef4b00",
            "#ed5700",
            "#eb6400",
            "#e87000",
            "#e57d00",
            "#e38900",
            "#e09500",
            "#dea200",
            "#dcae00",
            "#d9ba00",
            "#d6c700",
            "#d3d300",
            "#d0df00",
            "#cde600",
            "#cae400",
            "#c7e100",
            "#c4de00",
            "#c1db00",
            "#bed800",
            "#bbd500",
            "#b8d200",
            "#b5cf00",
            "#b2cc00",
            "#afc900",
        ];
        let index = 0;
        while (index <= polygons.length) {
            for (let i of gradient) {
                for (let j = index; j <= index + count; j += 1) {
                    if (j < polygons.length) polygons[j].color = polygons[0].hexToRgb(i);
                }
                index += count;
            }
            gradient.reverse();
        }

        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }
}

export default OneWayHyperboloid;
