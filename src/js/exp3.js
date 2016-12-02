var canvas = {
  id: "pt",
  x: 1300,
  y: 920
}

document.getElementById(canvas.id).style.width = canvas.x + "px";
document.getElementById(canvas.id).style.height = canvas.y + "px";

canvas.center = new Vector(canvas.x / 2, canvas.y / 2, 0);

var space = new CanvasSpace("canvas", "#f1f1f1").display("#" + canvas.id);
var form = new Form(space);


function moveTo(vector, angle, distance) {
  var x = vector.x + Math.cos(Util.toRadian(angle)) * distance,
      y = vector.y + Math.sin(Util.toRadian(angle)) * distance;

  return new Vector(x, y, 0);
}

var dotSize = 10;
var triSize = dotSize * 5;

var triTop = new Vector(moveTo(canvas.center, 0, triSize));
var triLeft = new Vector(moveTo(canvas.center, 0, triSize))
var triRight = new Vector(moveTo(canvas.center, 0, triSize))

var mouseCords = {
  x: 0,
  y: 0
}

var draw = {
  animate: function(time, fs, context) {
    form.stroke("#d0d0d0", 5);
    form.line(new Line(triTop).to(moveTo(triTop, -90, triSize * 3)));
    form.stroke("#d0d0d0", 5);
    form.line(new Line(triLeft).to(moveTo(triLeft, 30, triSize * 3)));
    form.stroke("#d0d0d0", 5);
    form.line(new Line(triRight).to(moveTo(triRight, 150, triSize * 3)));

    form.fill("#24F").stroke();
    form.circle(new Circle(moveTo(triTop, -90, triSize * 3 * mouseCords.y / canvas.y)).setRadius(dotSize));
    form.fill("#4F2").stroke();
    form.circle(new Circle(moveTo(triLeft, 30, triSize * 3 * mouseCords.x / canvas.y)).setRadius(dotSize));
    form.fill("#F24").stroke();
    form.circle(new Circle(moveTo(triRight, 150, triSize * 3 * mouseCords.x / canvas.y)).setRadius(dotSize));
  },
  onMouseAction: function(type, x, y, evt) {
    if(type = "move") {
      mouseCords.x = x;
      mouseCords.y = y;
    }
  }
}

space.add(draw);
space.bindMouse();
space.play();
