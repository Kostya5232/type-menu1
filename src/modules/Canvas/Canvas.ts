import { Point } from "../Math3D";
import { TWIN2D, TWIN3D } from "./TWIN";

export type TCanvasOptions = {
    id: string;
    WIN: TWIN2D | TWIN3D;
    width?: number;
    height?: number;
    callbacks?: any;
};

export default class Canvas {
    WIN: TWIN2D | TWIN3D;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    constructor(options: TCanvasOptions) {
        const { WIN, id, width = 700, height = 700, callbacks = {} } = options;
        this.WIN = WIN;
        this.canvas = document.getElementById(id) as HTMLCanvasElement;
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext(`2d`) as CanvasRenderingContext2D;
        this.canvas.addEventListener("wheel", callbacks.wheel);
        this.canvas.addEventListener("mousemove", callbacks.mouseMove);
        this.canvas.addEventListener("mouseup", callbacks.mouseUp);
        this.canvas.addEventListener("mousedown", callbacks.mouseDown);
        this.canvas.addEventListener("mouseleave", callbacks.mouseLeave);
    }

    xs(x: number): number {
        return (this.canvas.width * (x - this.WIN.LEFT)) / this.WIN.WIDTH;
    }

    ys(y: number): number {
        return this.canvas.height - (this.canvas.height * (y - this.WIN.BOTTOM)) / this.WIN.HEIGHT;
    }
    sx(x: number): number {
        return (x * this.WIN.WIDTH) / this.canvas.width;
    }
    sy(y: number): number {
        return (-y * this.WIN.HEIGHT) / this.canvas.height;
    }
    x(xs: number): number {
        return (xs * this.WIN.WIDTH) / this.canvas.width + this.WIN.LEFT;
    }
    y(ys: number): number {
        return (-ys * this.WIN.HEIGHT) / this.canvas.height + this.WIN.BOTTOM + this.WIN.HEIGHT;
    }

    clear(): void {
        this.context.fillStyle = "#fffff1";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    line(x1: number, y1: number, x2: number, y2: number, color = "#191970", width = 2, isDash = 0): void {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.lineWidth = width;
        this.context.setLineDash([isDash ? isDash : 0]);
        this.context.moveTo(this.xs(x1), this.ys(y1));
        this.context.lineTo(this.xs(x2), this.ys(y2));
        this.context.stroke();
    }
    text(text: string, x: number, y: number, color = "black", font = "italic 15px Arial"): void {
        this.context.fillStyle = color;
        this.context.font = font;
        this.context.fillText(text, this.xs(x), this.ys(y));
    }

    point(x: number, y: number, color = "red", size = 2): void {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.arc(this.xs(x), this.ys(y), size, 0, 2 * Math.PI);
        this.context.stroke();
    }

    polygon(points: Omit<Point, "z">[], color = "#0806"): void {
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.moveTo(this.xs(points[0].x), this.ys(points[0].y));
        for (let i = 1; i < points.length; i++) {
            this.context.lineTo(this.xs(points[i].x), this.ys(points[i].y));
        }
        this.context.lineTo(this.xs(points[0].x), this.ys(points[0].y));
        this.context.closePath();
        this.context.fill();
    }

    drawRect(x: number, y: number, width: number, height: number, color: string): void {
        const heightRect = (height * this.canvas.height) / this.WIN.HEIGHT;
        const widthRect = (width * this.canvas.width) / this.WIN.WIDTH;

        this.context.fillStyle = color;
        this.context.fillRect(this.xs(x), this.ys(y), widthRect, heightRect);
    }
}
