import { Figure, Point, Edge, Polygon } from "../entities";

class Sphere extends Figure {
    constructor(options = {}) {
        const { r = 10, count = 20, color = "#ffff44", animations = "", x = 0, y = 0, z = 0 } = options;
        const points = [];
        const edges = [];
        const polygons = [];

        for (let j = 0; j <= count; j++) {
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
        super(points, edges, polygons, animations);
    }
}

export default Sphere;
