import { Figure, Point, Edge, Polygon } from "../entities";
import { IidenticalParam } from "./IidenticalParam";

export interface TSphereOptions extends IidenticalParam {
    r: number;
    count: number;
}

class Sphere extends Figure {
    constructor(options: TSphereOptions) {
        super();
        const { r = 10, count = 20, color = "lightgreen", x = 0, y = 0, z = 0 } = options;
        const points = [];
        const edges = [];
        const polygons = [];

        for (let j = 0; j < count; j++) {
            const T = (Math.PI / count) * j;
            for (let i = 0; i < count; i++) {
                const p = ((2 * Math.PI) / count) * i;
                points.push(new Point(r * Math.sin(T) * Math.cos(p) + x, r * Math.cos(T) + y, r * Math.sin(T) * Math.sin(p) + z));
            }
        }

        for (let i = 0; i < points.length; i++) {
            if (i + +count + 1 < points.length && (i + 1) % count !== 0) {
                edges.push(new Edge(i, i + 1));
            }
            if ((i + 1) % count === 0) {
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

// function getRandomColor() {
//     const letters = "0123456789ABCDEF";
//     let color = "#";
//     for (let i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }

export default Sphere;
