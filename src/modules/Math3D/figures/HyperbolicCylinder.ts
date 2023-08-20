import { Figure, Point, Edge, Polygon } from "../entities";
import { IidenticalParam } from "./IidenticalParam";
export interface THyperbolicCylinderOptions extends IidenticalParam {
    a: number;
    b: number;
    count: number;
}

class HyperbolicCylinder extends Figure {
    constructor(options: THyperbolicCylinderOptions) {
        super();
        const { a = 10, b = 10, count = 20, color = "lightgreen", x = 0, y = 0, z = 0 } = options;
        const points = [];
        const edges = [];
        const polygons = [];

        for (let i = -count / 2; i <= count / 2; i++) {
            const T = (Math.PI / count) * i;
            for (let j = 0; j < count; j++) {
                const p = ((3 * Math.PI) / count) * j;
                points.push(new Point(b * Math.sinh(T) + x, a * Math.cosh(T) + y, p * 2 + z));
            }
        }

        for (let i = -count / 2; i <= count / 2; i++) {
            const T = (Math.PI / count) * i;
            for (let j = 0; j < count; j++) {
                const p = ((3 * Math.PI) / count) * j;
                points.push(new Point(b * Math.sinh(T) + x, -a * Math.cosh(T) + y, p * 2 + z));
            }
        }

        for (let i = 0; i < points.length; i++) {
            if (i + 1 < points.length && (i + 1) % count != 0) {
                edges.push(new Edge(i, i + 1));
            }
            if (i + count < points.length && i < count * count) {
                edges.push(new Edge(i, i + count));
            }
            if (i + count < points.length && i >= count * count + count) {
                edges.push(new Edge(i, i + count));
            }
        }

        for (let i = 0; i < points.length; i++) {
            if (i + count + 1 < points.length && (i + 1) % count != 0 && i < count * count) {
                polygons.push(new Polygon([i, i + 1, count + i + 1, count + i], color));
            }
            if (i + count + 1 < points.length && (i + 1) % count != 0 && i >= count * count + count) {
                polygons.push(new Polygon([i, i + 1, count + i + 1, count + i], color));
            }
        }
        let color_ = "#000000";
        const reverse = () => {
            color_ == "#000000" ? (color_ = "#ffffff") : (color_ = "#000000");
        };
        let ryad = 0;
        // let stolb = 0;
        // polygons.forEach((elem, index) => {
        //     stolb++;
        //     elem.color = elem.hexToRgb(color_);
        //     if (stolb === 2) {
        //         reverse();
        //         stolb = 0;
        //     }
        //     if (index % count === 0) {
        //         reverse();
        //         ryad++;
        //         if (ryad === 2) {
        //             reverse();
        //             ryad = 0;
        //         }
        //     }
        // });
        for (let i = 0; i <= polygons.length; i += 1) {
            for (let j = 1; j <= count; j += 2) {
                if (i + count * (j + 1) < polygons.length) {
                    polygons[i + count * j].color = polygons[0].hexToRgb(color_);
                    polygons[i + count * (j + 1)].color = polygons[0].hexToRgb(color_);
                }
                reverse();
            }
            ryad++;
            if (ryad === 2) {
                reverse();
                ryad = 0;
            }
        }

        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }
}

export default HyperbolicCylinder;
