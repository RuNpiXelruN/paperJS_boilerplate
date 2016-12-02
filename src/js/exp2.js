var space = new CanvasSpace( "hello", "#f1f1f1" ).display( "#pt" );
var form = new Form(space);

var canvasSize = 500;

var mouseCords = {
  x: 0,
  y: 0
}

angle = 0;

var linePoints = [];
var lineNumber = 50;
var lineLength = 0;

for (var i = 0; i < lineNumber; i++) {
  var cords = {
    x: Math.random() * canvasSize,
    y: Math.random() * canvasSize
  }

  linePoints.push(cords);
}

form.fill(false).stroke('#89f', 5);

var draw = {
  animate: function(time, fs, context) {
    for (var i = linePoints.length - 1; i >= 0; i--) {
      var x = linePoints[i].x,
          y = linePoints[i].y;

      form.line(
        new Line(x + Math.cos(Util.toRadian(angle)) * lineLength / 2, y + Math.sin(Util.toRadian(angle)) * lineLength / 2)
             .to(x - Math.cos(Util.toRadian(angle)) * lineLength / 2, y - Math.sin(Util.toRadian(angle)) * lineLength / 2)
      );
    }
  },
  onMouseAction: function(type, x, y, evt) {
    if (type == 'move') {
      mouseCords.x = x;
      mouseCords.y = y;

      var mouseAngle = Math.atan2(y - canvasSize / 2, x - canvasSize / 2) * (180 / Math.PI);

      angle = mouseAngle;
      lineLength = Math.sqrt(Math.pow(x - canvasSize / 2, 2) + Math.pow(y - canvasSize / 2, 2)) / 3
    }
  }
}

space.add(draw);
space.bindMouse();
space.play();
