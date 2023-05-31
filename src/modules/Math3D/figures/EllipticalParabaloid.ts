import { Figure, Point, Edge, Polygon } from "../entities";
import { IidenticalParam } from "./IidenticalParam";
interface TEllipticalParabaloidOptions extends IidenticalParam {
    a:number;
    b:number;
}

class EllipticalParabaloid extends Figure {
    constructor(options:TEllipticalParabaloidOptions) {
        super()
        const { a = 10 , b = 5  , count = 20 , color = 'lightgreen' , x = 0 , y = 0 , z = 0 } = options;
        const points = [];
        const edges = [];
        const polygons = [];

        for (let i = 0; i <= count; i++) {
            const T = ((2 * Math.PI) / count) * i;
            for (let j = 0; j < count; j++) {
                const p = ((2 * Math.PI) / count) * j;
                points.push(new Point(a * T * Math.cos(p) + x, T * T + y, b * T * Math.sin(p) + z));
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

        this.points = points
        this.edges = edges
        this.polygons = polygons
    }
}

export default EllipticalParabaloid;
