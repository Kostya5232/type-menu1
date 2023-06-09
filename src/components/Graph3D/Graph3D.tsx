import React, { useEffect } from "react";
import Math3D, { Point, Light, Polygon, Figure } from "../../modules/Math3D";
import { EDistance } from "../../modules/Math3D/entities/Polygon";
import useCanvas from "../../modules/Canvas/useCanvas";
import Canvas from "../../modules/Canvas/Canvas";
import FigureParams from "./FigureParams/FigureParams";
import Graph3DUI from "./Graph3DUI/Graph3DUI";

import "./Graph3D.css";

export type TScene = Figure[];

const Graph3D: React.FC = () => {
    const Canvas = useCanvas(renderScene);
    let canvas: Canvas | null;
    const WIN = {
        LEFT: -5,
        BOTTOM: -5,
        WIDTH: 10,
        HEIGHT: 10,
        FOCUS: new Point(0, 0, 30),
        CAMERA: new Point(0, 0, 40),
    };
    const LIGHT = new Light(-10, 10, 10, 3000000);
    let scene: TScene = [];

    let canRotate = false;
    let pointsCheckbox = true;
    let edgesCheckbox = true;
    let polygonsCheckbox = true;

    const math3D = new Math3D({ WIN });

    const setScene = (_scene: TScene) => {
        scene = _scene;
    };

    const showHidePoints = (value: boolean) => {
        pointsCheckbox = value;
    };

    const showHideEdges = (value: boolean) => {
        edgesCheckbox = value;
    };

    const showHidePolygons = (value: boolean) => {
        polygonsCheckbox = value;
    };

    function wheel(event: WheelEvent) {
        const delta = event.deltaY > 0 ? 1 : -1;
        WIN.CAMERA.z += delta;
        WIN.FOCUS.z += delta;
    }

    function mouseUp(): void {
        canRotate = false;
    }

    function mouseDown(): void {
        canRotate = true;
    }

    function mouseMove(event: MouseEvent): void {
        if (canRotate) {
            scene.forEach((figure) =>
                figure.points.forEach((point: Point) => {
                    const { movementX, movementY } = event;
                    math3D.transform(math3D.rotateOy(movementX / 180), point);
                    math3D.transform(math3D.rotateOx(movementY / 180), point);
                })
            );
        }
    }

    function renderScene(FPS: number) {
        if (!canvas) return;
        canvas.clear();
        if (polygonsCheckbox) {
            const polygons: Polygon[] = [];
            scene.forEach((figure, index) => {
                math3D.calcCenter(figure);
                math3D.calcRadius(figure);
                math3D.calcDisctance(figure, WIN.CAMERA, EDistance.distance);
                math3D.calcDisctance(figure, LIGHT, EDistance.lumen);
                figure.polygons.forEach((polygon: Polygon) => {
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
                let lumen = math3D.calcIllumination(polygon.lumen, LIGHT.lumen * (isShadow && dark ? dark : 1));
                r = Math.round(r * lumen);
                g = Math.round(g * lumen);
                b = Math.round(b * lumen);
                canvas?.polygon(
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
                    canvas?.line(math3D.xs(point1), math3D.ys(point1), math3D.xs(point2), math3D.ys(point2));
                })
            );
        }
        if (pointsCheckbox) {
            scene.forEach((figure) =>
                figure.points.forEach((point: Point) => {
                    canvas?.point(math3D.xs(point), math3D.ys(point));
                })
            );
        }
        canvas?.text(`FPS:${FPS}`, -4, 4);
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
            <FigureParams setScene={setScene} />
        </div>
    );
};

export default Graph3D;
