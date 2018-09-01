canvas.width = 350;
canvas.height = 150;

var objCanvas = {
  initCanvas: function () {
    objCanvas.mouseDown ();
    objCanvas.mouseUp ();
    objCanvas.mouseMove ();
    objCanvas.touchStart ();
    objCanvas.touchEnd ();
    objCanvas.touchMove ();
    objCanvas.drawLoop ();
  },
  drawing: false,
  mousePos: {
    x: 0,
    y: 0,
  },
  canvas: document.getElementById ('canvas'),

  mouseDown: function () {
    this.canvas.addEventListener (
      'mousedown',
      function (e) {
        objCanvas.drawing = true;
        objCanvas.lastPos = objCanvas.getMousePos (objCanvas.canvas, e);
      },
      false
    );
  },
  mouseUp: function () {
    objCanvas.canvas.addEventListener (
      'mouseup',
      function (e) {
        objCanvas.drawing = false;
      },
      false
    );
  },
  mouseMove: function () {
    this.canvas.addEventListener (
      'mousemove',
      function (e) {
        objCanvas.mousePos = objCanvas.getMousePos (objCanvas.canvas, e);
      },
      false
    );
  },
  getMousePos: function (canvasDom, mouseEvent) {
    var rect = canvasDom.getBoundingClientRect ();
    return {
      x: mouseEvent.clientX - rect.left,
      y: mouseEvent.clientY - rect.top,
    };
  },
  renderCanvas: function () {
    if (objCanvas.drawing) {
      ctx.lineTo (objCanvas.mousePos.x, objCanvas.mousePos.y);
      ctx.stroke ();
      lastPos = objCanvas.mousePos;
    }
  },
  drawLoop: function () {
    (function drawLoop () {
      requestAnimFrame (drawLoop);
      objCanvas.renderCanvas ();
    }) ();
  },
  getTouchPos: function (canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect ();
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top,
    };
  },
  touchStart: function () {
    objCanvas.canvas.addEventListener (
      'touchstart',
      function (e) {
        objCanvas.mousePos = objCanvas.getTouchPos (objCanvas.canvas, e);
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent ('mousedown', {
          clientX: touch.clientX,
          clientY: touch.clientY,
        });
        objCanvas.canvas.dispatchEvent (mouseEvent);
      },
      false
    );
  },
  touchEnd: function () {
    objCanvas.canvas.addEventListener (
      'touchend',
      function (e) {
        var mouseEvent = new MouseEvent ('mouseup', {});
        objCanvas.canvas.dispatchEvent (mouseEvent);
      },
      false
    );
  },
  touchMove: function () {
    objCanvas.canvas.addEventListener (
      'touchmove',
      function (e) {
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent ('mousemove', {
          clientX: touch.clientX,
          clientY: touch.clientY,
        });
        objCanvas.canvas.dispatchEvent (mouseEvent);
      },
      false
    );
  },
  efface: function () {
    ctx.clearRect (0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath ();
  },
};
window.requestAnimFrame = (function (callback) {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimaitonFrame ||
    function (callback) {
      window.setTimeout (callback, 1000 / 60);
    }
  );
}) ();
$ ('.buttonEfface').click (function () {
  objCanvas.efface ();
  objCanvas.initCanvas ();
});
var ctx = objCanvas.canvas.getContext ('2d');
