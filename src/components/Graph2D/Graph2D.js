import React, { useEffect } from 'react';
import Canvas from '../../modules/Canvas/Canvas';
import FuncMath from './FuncMath';
import UIComponent from './UI/UIComponent';
import './Graph2D.css';

export default function Graph2D() {
  let canvas = null;
  let ui = null;
  let funcMath = null;
  const WIN = {
    LEFT: -10,
    BOTTOM: -10,
    WIDTH: 20,
    HEIGHT: 20,
  };

  let derevativeX = 0;
  let funcs = [];
  let canMove = false;

  useEffect(() => {
    canvas = new Canvas({
      WIN: WIN,
      id: 'canvas',
      width: 600,
      height: 600,
      callbacks: {
        wheel: (event) => wheel(event),
        mouseMove: (event) => mouseMove(event),
        mouseUp: () => mouseUp(),
        mouseDown: () => mouseDown(),
        mouseLeave: () => mouseLeave(),
      },
    });
    ui = new UIComponent({
      id: 'ui',
      parent: 'ui',
      callbacks: {
        delFunction: (num) => delFunction(num),
        addFunction: (f, num, width, color, sLine, eLine, printDerevative) =>
          addFunction(f, num, width, color, sLine, eLine, printDerevative),
      },
    });
    funcMath = new FuncMath({ WIN: WIN, canvas: canvas });

    renderCanvas();
  });

  function addFunction(f, num, width = 9, color = 'red', sLine, eLine, printDerevative) {
    funcs[num] = { f, color, width, sLine, eLine, printDerevative };
    renderCanvas();
  }

  function delFunction(num) {
    funcs[num] = null;
    renderCanvas();
  }

  function mouseMove(event) {
    if (canMove) {
      WIN.LEFT -= canvas.sx(event.movementX);
      WIN.BOTTOM -= canvas.sy(event.movementY);
    }
    derevativeX = WIN.LEFT + canvas.sx(event.offsetX);
    renderCanvas(event);
  }
  function mouseLeave() {
    canMove = false;
  }
  function mouseUp() {
    canMove = false;
  }
  function mouseDown() {
    canMove = true;
  }
  function wheel(event) {
    event.preventDefault();
    let delta = event.deltaY > 0 ? -0.3 : +0.3;
    if (WIN.BOTTOM + delta < -6) {
      WIN.WIDTH -= delta;
      WIN.HEIGHT -= delta;
      WIN.LEFT += delta / 2;
      WIN.BOTTOM += delta / 2;
    }
    renderCanvas();
  }

  const printFunction = (f, color, width) => {
    let x = WIN.LEFT;
    let dx = WIN.WIDTH / 1000;
    while (x < WIN.LEFT + WIN.WIDTH) {
      canvas.line(x, f(x), x + dx, f(x + dx), color, width);
      x += dx;
    }
  };

  const printIntegral = (f, a, b, n = 100) => {
    const dx = (b - a) / n;
    let x = a;
    const points = [];
    points.push({ x, y: 0 });
    while (x < b) {
      points.push({ x, y: f(x) });
      x += dx;
    }
    points.push({ x: b, y: 0 });
    canvas.polygon(points, 'rgba(154, 205, 50, 0.7)');
  };

  const printXY = () => {
    const { LEFT, BOTTOM, WIDTH, HEIGHT } = WIN;

    //Стрелки
    canvas.line(WIDTH + LEFT, 0, WIDTH + LEFT - 0.4, 0.15, 'black', 2);
    canvas.line(WIDTH + LEFT, 0, WIDTH + LEFT - 0.4, -0.15, 'black', 2);
    canvas.line(0, HEIGHT + BOTTOM, -0.15, HEIGHT + BOTTOM - 0.4, 'black', 2);
    canvas.line(0, HEIGHT + BOTTOM, 0.15, HEIGHT + BOTTOM - 0.4, 'black', 2);
    //Клетки
    for (let i = 0; i > LEFT; i--) {
      canvas.line(i, BOTTOM + LEFT, i, HEIGHT + BOTTOM, '#BEBEBE', 1);
    }
    for (let i = 0; i < HEIGHT + LEFT - BOTTOM + WIDTH; i++) {
      canvas.line(i, BOTTOM, i, 0, '#BEBEBE', 1);
    }
    for (let i = 0; i < HEIGHT + LEFT + BOTTOM + WIDTH; i++) {
      canvas.line(i, 0, i, HEIGHT + BOTTOM, '#BEBEBE', 1);
      canvas.line(LEFT, i, HEIGHT + LEFT, i, '#BEBEBE', 1);
    }
    for (let i = 0; i > BOTTOM; i--) {
      canvas.line(LEFT + BOTTOM, i, WIDTH + LEFT, i, '#BEBEBE', 1);
    }
    for (let i = 0; i < HEIGHT - LEFT + BOTTOM + WIDTH; i++) {
      canvas.line(LEFT, i, 0, i, '#BEBEBE', 1);
    }
    //Оси
    canvas.line(0, BOTTOM, 0, HEIGHT + BOTTOM, 'black', 3);
    canvas.line(LEFT, 0, WIDTH + LEFT, 0, 'black', 3);
  };

  const printNums = (streakLength = WIN.HEIGHT / (WIN.WIDTH + 30)) => {
    const len = streakLength / 2;
    const shiftY = -WIN.HEIGHT / 200 - 0.4;
    const shiftX = WIN.WIDTH / 200;
    for (let i = Math.round(WIN.LEFT); i < WIN.LEFT + WIN.WIDTH; i++) {
      canvas.line(i, len, i, -len, 'black', 2.5);
      canvas.text(i, i + shiftX, shiftY);
      // y на оси
      canvas.text('y', 0 + 0.4, WIN.BOTTOM + WIN.HEIGHT - 0.5, 'black');
    }
    for (let i = Math.round(WIN.BOTTOM); i < WIN.BOTTOM + WIN.HEIGHT; i++) {
      canvas.line(len, i, -len, i, 'black', 2.5);
      canvas.text(i, shiftX, i + shiftY);
      // x на оси
      canvas.text('x', WIN.LEFT + WIN.WIDTH - 0.4, 0 + 0.3, 'black');
    }
  };

  const printRect = (event) => {
    const x = Math.floor(canvas.x(event.offsetX));
    const y = Math.ceil(canvas.y(event.offsetY));
    canvas.drawRect(x, y, 1, 1, '#1be');

    const shiftY = WIN.HEIGHT * 0.01;
    const shiftX = WIN.WIDTH * 0.01 + 0.02;

    const nums = [
      { x: 0, y: 0, shiftX: -shiftX, shiftY: shiftY },
      { x: 0, y: -1, shiftX: -shiftX, shiftY: -shiftY },
      { x: 1, y: 0, shiftX: 0, shiftY: shiftY },
      { x: 1, y: -1, shiftX: 0, shiftY: -shiftY },
    ];
    nums.forEach((coord) => {
      canvas.text(
        `(${coord.x + x}; ${coord.y + y})`,
        x + coord.x + coord.shiftX,
        y + coord.y + coord.shiftY,
        'black'
      );
    });
  };
  function renderCanvas(event = null) {
    canvas.clear();
    printXY();
    if (event) {
      printRect(event);
    }
    printNums();
    //Function
    funcs.forEach((f) => {
      if (f) {
        printFunction(f.f, f.color, f.width);
      }
    });

    //Derivative
    funcs.forEach((f) => {
      if (f && f.printDerevative) {
        funcMath.printTangent(f.f, derevativeX);
      }
    });

    //Integral
    funcs.forEach((f) => {
      if (f) {
        printIntegral(f.f, f.sLine - 0, f.eLine - 0);
      }
    });
    return null;
  }
  return (
    <div className="flex">
      <div className="canvas">
        <canvas id="canvas"></canvas>
      </div>
      <button id="addFunction" onClick={() => ui.addFunction()}>
        Add function
      </button>
      <div id="funcsInputs"></div>
    </div>
  );
}
