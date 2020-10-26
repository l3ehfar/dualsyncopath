var font;
var vehicles = [];
var n = 1;
var radius = 3;
var w = 0;
var counter = 0;
var h;
var lnheight;

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
  createCanvas(windowWidth-20, windowHeight-20);
  background(51);
  var points = font.textToPoints('dualsyncopath', windowWidth/9, windowHeight/2, windowWidth/9, {
    sampleFactor: 0.25
  });

  h = height/(height/2.1);
  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
}

function draw() {
  background(51);
  for (var i = 0; i < vehicles.length; i++) {
    if(n == 0){
      radius = 6 * sin(i / 40 + frameCount / 30);
      if(counter<=160){
      counter += 0.001*random();
      }else{
        counter = 160;
      }
    }else{
      radius = 3 * sin(i / 60 + frameCount / 30);
      if(counter >= 0){
        counter -= 0.002;
      }else{
        counter = 0;
      }
    }
    var v = vehicles[i];
    var ln = ((i%10)*10*ceil(i/10));
    var lm = 80*sin(radians(ln-w));
    lnheight = ln*h;
    v.behaviors(n,1,width/2+lm, lnheight, width/2-lm, lnheight+15);
    v.update();
    v.show(radius);
    v.spin(counter);
  }
  w++;
}


function mouseWheel(event) {
  if(event.delta>0){
    n = 0;
  }else{
    n = 1;
  }
}