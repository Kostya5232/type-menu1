import { useEffect } from "react";
import Math3D, { Point, Light, Sphere } from "../../modules/Math3D";
import useCanvas from "../../modules/Canvas/useCanvas";
import FigureParams from "./FigureParams/FigureParams";
import Graph3DUI from "./Graph3DUI/Graph3DUI";

import "./Graph3D.css";

export default function Graph3D() {
    const Canvas = useCanvas(renderScene);
    let canvas = null;
    const WIN = {
        LEFT: -5,
        BOTTOM: -5,
        WIDTH: 10,
        HEIGHT: 10,
        FOCUS: new Point(0, 0, 30),
        CAMERA: new Point(0, 0, 40),
    };
    let canRotate = false;
    const LIGHT = new Light(-30, 30, 10, 30000);
    let scene = [new Sphere(), new Sphere(3, 20, "#ffff00", -15, 12, -7)];

    let pointsCheckbox = true;
    let edgesCheckbox = true;
    let polygonsCheckbox = true;

    const math3D = new Math3D({ WIN });

    const setScene = (_scene) => {
        scene = _scene;
    };

    const showHidePoints = (value) => {
        pointsCheckbox = value;
    };

    const showHideEdges = (value) => {
        edgesCheckbox = value;
    };

    const showHidePolygons = (value) => {
        polygonsCheckbox = value;
    };

    function wheel(event) {
        const delta = event.wheelDelta > 0 ? 1 : -1;
        WIN.CAMERA.z += delta;
        WIN.FOCUS.z += delta;
    }

    function mouseUp() {
        canRotate = false;
    }

    function mouseDown() {
        canRotate = true;
    }

    function mouseMove(event) {
        if (canRotate) {
            scene.forEach((figure) =>
                figure.points.forEach((point) => {
                    const { movementX, movementY } = event;
                    math3D.transform(math3D.rotateOy(movementX / 180), point);
                    math3D.transform(math3D.rotateOx(movementY / 180), point);
                })
            );
        }
    }

    function renderScene(FPS) {
        if (!canvas) return;
        canvas.clear();
        if (polygonsCheckbox) {
            const polygons = [];
            scene.forEach((figure, index) => {
                math3D.calcCenter(figure);
                math3D.calcRadius(figure);
                math3D.calcDisctance(figure, WIN.CAMERA, "distance");
                math3D.calcDisctance(figure, LIGHT, "lumen");
                figure.polygons.forEach((polygon) => {
                    polygon.figureIndex = index;
                    polygons.push(polygon);
                });
            });
            math3D.sortByArtistAlgorithm(polygons);
            polygons.forEach((polygon) => {
                const figure = scene[polygon.figureIndex];
                const points = [
                    figure.points[polygon.points[0]],
                    figure.points[polygon.points[1]],
                    figure.points[polygon.points[2]],
                    figure.points[polygon.points[3]],
                ];
                let { r, g, b } = polygon.color;
                const { isShadow, dark } = math3D.calcShadow(polygon, scene, LIGHT);
                let lumen = math3D.calcIllumination(polygon.lumen, LIGHT.lumen * (isShadow ? dark : 1));
                r = Math.round(r * lumen);
                g = Math.round(g * lumen);
                b = Math.round(b * lumen);
                canvas.polygon(
                    points.map((point) => {
                        return {
                            x: math3D.xs(point),
                            y: math3D.ys(point),
                        };
                    }),
                    polygon.rgbToHex(r, g, b)
                );
            });
        }
        if (edgesCheckbox) {
            scene.forEach((figure) =>
                figure.edges.forEach((edge) => {
                    const point1 = figure.points[edge.p1];
                    const point2 = figure.points[edge.p2];
                    canvas.line(math3D.xs(point1), math3D.ys(point1), math3D.xs(point2), math3D.ys(point2));
                })
            );
        }
        if (pointsCheckbox) {
            scene.forEach((figure) =>
                figure.points.forEach((point) => {
                    canvas.point(math3D.xs(point), math3D.ys(point));
                })
            );
        }
        canvas.text(`FPS:${FPS}`, -4, 4);
    }

    useEffect(() => {
        canvas = Canvas({
            WIN,
            id: "canvas3D",
            width: 600,
            height: 600,
            callbacks: {
                wheel,
                mouseMove,
                mouseUp,
                mouseDown,
            },
        });

        const interval = setInterval(() => {
            scene.forEach((figure) => figure.doAnimation(math3D));
        }, 50);

        return () => {
            clearInterval(interval);
            canvas = null;
        };
    });

    return (
        <div className="canvas3DContain">
            <div className="canvas3D">
                <Graph3DUI showHidePoints={showHidePoints} showHideEdges={showHideEdges} showHidePolygons={showHidePolygons} />
                <canvas id="canvas3D"></canvas>
            </div>
            <FigureParams
                setScene={setScene}
            />
        </div>
    );
}
