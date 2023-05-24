import Canvas from "./Canvas";

export default function useCanvas(render = () => {}) {
    window.requestAnimFrame = (function () {
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callbacks) {
                window.setTimeout(callbacks, 1000, 160);
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

    return (params) => {
        animLoop();
        return new Canvas(params);
    };
}
