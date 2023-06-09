import { Figure, Point, Edge, Polygon } from "../entities";
import { IidenticalParam } from "./IidenticalParam";
export interface TConeOptions extends IidenticalParam {
    r: number;
    count: number;
}

class Cone extends Figure {
    constructor(options: TConeOptions) {
        super();
        const { r = 2, count = 8, color = 'lightgreen', x = 0, y = 0, z = 0 } = options;
        const points = []
        const edges = [];
        const polygons = [];

        for (let i = -count; i <= count; i++) {
            const T = ((2 * Math.PI) / count) * i;
            for (let j = 0; j < count; j++) {
                const p = ((2 * Math.PI) / count) * j;
                points.push(new Point(r * T * Math.cos(p) + x, r * T + y, Math.sin(p) * r * T + z));
            }
        }

        for (let i = 0; i < points.length; i++) {
            if (i + 1 < points.length && (i + 1) % count !== 0) {
                edges.push(new Edge(i, i + 1));
            } else if ((i + 1) % count === 0) {
                edges.push(new Edge(i, i + 1 - count));
            }
            if (i < points.length - count) {
                edges.push(new Edge(i, i + count));
            }
        }

        for (let i = 0; i < points.length; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
            } else if (i + count < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color));
            }
        }

        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }
}

export default Cone;
