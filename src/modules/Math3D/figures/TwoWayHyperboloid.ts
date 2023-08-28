import { Figure, Point, Edge, Polygon } from "../entities";
import { IidenticalParam } from "./IidenticalParam";

export interface TTwoWayHyperboloidOptions extends IidenticalParam {
    a: number;
    b: number;
    c: number;
    count: number;
}

class TwoWayHyperboloid extends Figure {
    constructor(options: TTwoWayHyperboloidOptions) {
        super();
        const { a = 5, b = 5, c = 5, count = 20, color = "lightgreen", x = 0, y = 0, z = 0 } = options;
        const points = [];
        const edges = [];
        const polygons = [];
        for (let i = 0; i <= count / 2; i++) {
            let T = (Math.PI / count) * i;
            for (let j = 0; j < count; j++) {
                const p = ((2 * Math.PI) / count) * j;
                points.push(new Point(a * Math.sinh(T) * Math.cos(p) + x, c * Math.cosh(T) + y, b * Math.cosh(T) * Math.sin(p) + z));
            }
        }
        for (let i = 0; i <= count / 2; i++) {
            let T = (Math.PI / count) * i;
            for (let j = 0; j < count; j++) {
                const p = ((2 * Math.PI) / count) * j;
                points.push(new Point(-a * Math.sinh(T) * Math.cos(p) + x, -c * Math.cosh(T) + y, -b * Math.cosh(T) * Math.sin(p) + z));
            }
        }

        for (let i = 0; i < points.length; i++) {
            //вдоль
            if (i + 1 < points.length && (i + 1) % count !== 0) {
                edges.push(new Edge(i, i + 1));
            } else if (i + 1 >= count && (i + 1) % count === 0) {
                edges.push(new Edge(i, i + 1 - count));
            }
        }

        //полигоны
        for (let i = 0; i < points.length / 2 - count; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
            } else if (i + count < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color));
            }
        }
        for (let i = points.length / 2; i < points.length; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
            } else if (i + count < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color));
            }
        }
        const gradient = ["#FF0000", "#FFA500", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#FF00FF"];
        let index = 0;
        while (index <= polygons.length) {
            for (let i of gradient) {
                for (let j = index; j <= index + count; j += 1) {
                    if (j < polygons.length) polygons[j].color = polygons[0].hexToRgb(i);
                }
                index += count;
            }
        }

        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }
}

export default TwoWayHyperboloid;
