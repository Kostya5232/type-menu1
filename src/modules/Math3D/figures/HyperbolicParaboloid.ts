import { Figure, Point, Edge, Polygon } from "../entities";
import { IidenticalParam } from "./IidenticalParam";

export interface THyperbolicParaboloidOptions extends IidenticalParam {
    p: number;
    q: number;
    count: number;
}
class HyperbolicParaboloid extends Figure {
    constructor(options: THyperbolicParaboloidOptions) {
        super();
        const { p = 4, q = 4, count = 20, color = "lightgreen", x = 0, y = 0, z = 0 } = options;
        const points = [];
        const edges = [];
        const polygons = [];

        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                const x1 = i - count / 2;
                const y1 = j - count / 2;
                const z1 = ((x1 * x1) / p - (y1 * y1) / q) / 2;
                points.push(new Point(x1 + x, z1 + y, y1 + z));
            }
        }

        for (let i = 0; i < points.length; i++) {
            if (points[i + 1]) {
                if ((i + 1) % count !== 0) {
                    edges.push(new Edge(i, i + 1));
                }
            }
            if (points[i + count]) {
                edges.push(new Edge(i, i + count));
            }
        }

        for (let i = 0; i < points.length; i++) {
            if (points[i + 1 + count]) {
                if ((i + 1) % count !== 0) {
                    polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
                }
            }
        }
        let asd = () => {
            opasit += (count * 2) / polygons.length;
        };
        let index = 0;
        let opasit = 0;
        for (let i = 0; i < count / 2; i++) {
            for (let j = index; j < index + count; j++) {
                if (index + count < polygons.length) polygons[j].opasit = opasit;
                console.log(opasit);
            }
            asd();
            index += count;
        }
        opasit = 1;
        asd = () => {
            opasit -= (count * 2) / polygons.length;
        };
        for (let i = count / 2; i < count; i++) {
            for (let j = index; j < index + count + 1; j++) {
                if (index + count < polygons.length) polygons[j].opasit = opasit;
            }
            console.log(opasit);
            asd();
            index += count;
        }

        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }
}

export default HyperbolicParaboloid;
