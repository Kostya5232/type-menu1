import Canvas, { TCanvasOptions } from "./Canvas";

declare global {
    interface Window { 
        requestAnimFrame: Function; 
        webkitRequestAnimationFrame: Function;
        mozRequestAnimationFrame: Function;
        oRequestAnimationFrame: Function;
        msRequestAnimationFrame: Function;
    }
}

export default function useCanvas(render: (FPS: number) => void ) {
    window.requestAnimFrame = (function () {
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback: Function) {
                window.setTimeout(callback, 1000, 160);
            }
        );
    })();

    let FPS = 0;
    var outFPS = 0;
    let lastTimestamp = Date.now();

    const animLoop = () => {
        FPS++;
        const timestamp = Date.now();
        if (timestamp - lastTimestamp >= 1000) {
            outFPS = FPS;
            FPS = 0;
            lastTimestamp = timestamp;
        }
        render(outFPS);
        window.requestAnimationFrame(animLoop);
    };

    return (params: TCanvasOptions) => {
        animLoop();
        return new Canvas(params);
    };
}
