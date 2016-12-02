
//// 1. Define Space and Form
var colors = {
  a1: "#ff2305", a2: "#0f4beb",
  b1: "#ffffff", b2: "#ebebeb", b3: "#b2b2b2", b4: "#323232", b5: "#000000"
};

var space = new CanvasSpace("pt").setup( { bgcolor: colors.b2 } );
var form = new Form( space );



// Create elements
var unit = space.size.$divide(20);
var mouse = new Vector( space.size.x/2, space.size.y/1.35 );

var rects = [
  new Rectangle( unit.$multiply(10) ).to( unit.$multiply(5) ),
]


// Visualise. animation, and interaction
space.add({
  animate: function(time, fps, context) {
    var mag = mouse.distance( space.size.$divide(100) );
    var d1 = mouse.$subtract( space.size.$divide(100) ).divide(10);
    var shadows = [];

    // calc rects shadows
    for (var i = 0; i < rects.length; i++) {
      var d2 = rects[i].center.$subtract( space.size.$divide(2) );
      var d = (mag - rects[i].distance( space.size.$divide(2) )) / mag;
      d = d / Math.abs( d ) * Math.min( 0.4, Math.abs( d ) );
      var shadow = rects[i].clone().moveBy( d1.$multiply(4).$add( d2 ).$multiply( d ) );
      shadows.push(shadow);

      // draw rectangle that encloses both rect and shadow
      form.stroke(false).fill(colors.a1).rect( rects[i].$enclose( shadow ) );
    }

    // draw shadows and intersection points between shadows
    for (i = 0; i < rects.length; i++) {
      form.stroke( "rgba(0,0,0,0)", 7 ).fill(colors.b1).rect( rects[i] );
    }
  },

  onMouseAction: function(type, x, y, event) {
    if  (type == 'move') {
      mouse.set(x,y);
    }
  },

  onTouchAction: function(type, x, y, event) {
    this.onMouseAction( type, x, y );
  }
});

// play creation
space.bindMouse();
space.bindTouch();
space.play();
