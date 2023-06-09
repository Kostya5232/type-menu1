import { Figure, Point, Edge, Polygon } from "../entities";
import { IidenticalParam } from "./IidenticalParam";

export interface TCylinderOptions extends IidenticalParam {
    a: number;
    b: number;
    h: number
    count: number;
}

class Cylinder extends Figure {
    constructor(options: TCylinderOptions) {
        super()
        const { a = 5, b = 5, h = 10, count = 10, color = 'ff0000', x = 0, y = 0, z = 0 } = options;
        const points = [];
        const edges = [];
        const polygons = [];


        //точки
        for (let _h = -h; _h < h; _h = _h + 2) {
            for (let j = 0; j < count; j++) {
                let p = (2 * Math.PI) / count * j
                points.push(new Point(a * Math.cos(0) * Math.cos(p) + x, _h + y, b * Math.sin(p) + z));
            }

        }

        //ребра
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

        //полигоны
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

export default Cylinder;
