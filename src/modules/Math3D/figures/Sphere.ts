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
        let a = 0;
        let ryad = 0;
        let color_ = "#000000";
        const reverse = () => {
            color_ == "#000000" ? (color_ = "#ffffff") : (color_ = "#000000");
        };
        // polygons.forEach((elem, index) => {
        //     a++;
        //     if (a === 3) {
        //         reverse();
        //         a = 0;
        //     }
        //     if (index % count === 0) {
        //         reverse();
        //         ryad++;
        //         if (ryad === 3) {
        //             reverse();
        //             ryad = 0;
        //         }
        //     }
        //     elem.color = elem.hexToRgb(color_);
        // });
        for (let i = 0; i < polygons.length; i++) {
            for (let j = 1; j <= count; j += 3) {
                if (i + count * j + 1 < polygons.length) {
                    polygons[i].color = polygons[i].hexToRgb(color_);
                    polygons[i + count * j].color = polygons[i].hexToRgb(color_);
                    polygons[i + count * j + 1].color = polygons[i].hexToRgb(color_);
                }
                reverse();
            }
            ryad++;
            if (ryad === 3) {
                reverse();
                ryad = 0;
            }
        }

        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }
}

export default Sphere;
