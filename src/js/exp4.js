var canvas = {
  id: "pt",
  x: 1300,
  y: 880
}

document.getElementById(canvas.id).style.width = canvas.x + "px";
document.getElementById(canvas.id).style.height = canvas.y + "px";

canvas.center = new Vector(canvas.x / 2, canvas.y /2, 0);

var space = new CanvasSpace("canvas", "#ebebeb").display("#" + canvas.id);
var form = new Form(space);

var dot = new Circle( canvas.x / 2, canvas.y / 2 ).setRadius(50);

var bot = {
  animate: function(time, fs, context) {
    // console.log('form', form)

    form.fill( "#e3d1e3" );
    form.text( new Point( 20,20 ), "frame rate  is " + (1000/fs));

    form.fill( "#0f4beb" ).stroke(false);
    form.cc.shadowColor = "rgba(0,0,0,0.3)"
    form.cc.imageSmoothingQuality = "high"
    form.cc.shadowOffsetX = "10"
    form.cc.shadowOffsetY = "10"
    form.cc.shadowBlur = "50"
    dot.setRadius( Math.abs(1000 - time % 2000)/20 + 100 );
    // console.log('math', 1000 - time % 2000);
    form.circle(dot);
  },

  onMouseAction: function(type, x, y, event) {
    if (type === 'drag') {
      dot.set( x, y );
    }
  }
}

space.add(bot);
space.bindMouse();
space.play();
