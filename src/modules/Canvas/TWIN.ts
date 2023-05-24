import { Point } from "../Math3D";

export type TWIN2D = {
    LEFT:number,
    RIGHT:number,
    WIDTH:number,
    HEIGHT:number
}

export type TWIN3D = TWIN2D & {
    FOCUS:Point,
    CAMERA:Point
};