var font;
var vehicles = [];
var n = 0;
var radius = 3;
var w = 0;
var counter = 0;
var h;
var lnheight;
var sw = 0;
var textcolor = 0;
var textcolor1 = 0;
var textcolor2 = 0;
var textcolor3 = 255;
var timer = 10000.0;
var time = 0.0;
var dt = 0.95;
let fa;
let offset = 0;
let easing = 0.05;

let poly = []
let poly2 = []
let num = 100, num2 = 100;
var background1;
let img;

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
  fa = loadFont('fa.otf');
  br = loadFont('br.otf');
  background1 = loadImage("back2.gif");
  img = loadImage('beh.jpg');
}
function setup() {
  createCanvas(windowWidth - 23, windowHeight - 22);
  smooth()
  if (width > 500) {
    var points = font.textToPoints('Dualsyncopath', windowWidth / 3.9, windowHeight / 2, windowWidth / 15, {
      sampleFactor: 0.25
    });
  } else {
    var points = font.textToPoints('Dualsyncopath', windowWidth / 10, windowHeight / 2, windowWidth / 9, {
      sampleFactor: 0.25
    });
  }
  h = height / (height / 2.1);
  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }

}

function draw() {
  background(0, 2, 7)
  clear()
  if (n >= 2) {
    if (textcolor3 >= 0) {
      textcolor3 -= 0.9;
    }
  } else {
    if (textcolor3 < 255) {
      textcolor3 += 10;
    }
  }

  image(background1, 0, 0, width, height);
  stroke(0, 2, 7, textcolor3)
  fill(0, 2, 7, textcolor3)
  rect(0, 0, width, height)

  // var color2 = color(255, 120, 226);
  // var color1 = color(255, 196, 120);
  // push()
  // blendMode(OVERLAY)
  // for (var x = 0; x < width; x++)
  // {
  //   stroke(0, color1, color2);
  //   line(x, 0, x, height);
  //   color1 = color1 - 0.25
  //   color2 += 0.25;
  // }
  // pop()

  if (width > 500) {
    for (var j = 0; j < 4; j++) {
      if (n == j) {
        fill(250, 80);
      } else {
        fill(250, 0);
      }
      stroke(250, 50);
      ellipse(width - 30, height / 2.4 + (j * 30), 10, 10);
    }
  }

  if (width >= 1500) {
    textSize(18);
  } else if (width >= 1900) {
    textSize(20);
  } else {
    textSize(14)
  }

  if (n == 1) {
    if (textcolor1 < 255) {
      textcolor1 += 5;
    }
  } else {
    if (textcolor1 >= 0) {
      textcolor1 -= 10;
    }
  }
  if (textcolor1 >= 0) {
    push();
    rectMode(CENTER)
    textAlign(CENTER, CENTER)
    noStroke();
    fill(textcolor1)
    textWithBlur("~ Only those who attempt the absurd will achieve the impossible. ~", height - 130, textcolor1, width / 20, 13)
    textWithBlur("- M. C. Escher", height - 100, textcolor1, width / 20 + 10, 13)
    pop();
  }

  if (n == 2) {
    if (textcolor <= 50) {
      textcolor += 1;
    } else if (textcolor > 50 & textcolor < 255) {
      textcolor += 3;
    }
  } else {
    if (textcolor >= 0) {
      textcolor -= 10;
    }
  }
  if (textcolor >= 0) {
    push();
    rectMode(CENTER)
    textAlign(CENTER, CENTER)
    noStroke();
    fill(textcolor)
    textWithBlur("Dualsyncopath", 100 * 3 + 25, textcolor, width / 20 + 5, 25)
    textWithBlur("is an invitation to those seeking ", 100 * 3 + 60, textcolor, width / 20, 13)
    textWithBlur("multidisciplinary collaboration", (100 * 3 + 60) + 30, textcolor, width / 20 + 2, 13)
    textWithBlur("in creative applications.", (100 * 3 + 60) + 60, textcolor, width / 20, 13)
    // textWithBlur("in computer science.", (100 * 3 + 60) + 90, textcolor, width / 20, 13)
    pop();
  }

  if (n == 3) {
    if (textcolor2 <= 50) {
      textcolor2 += 1;
    } else if (textcolor2 > 50 & textcolor2 < 255) {
      textcolor2 += 3;
    }
  } else {
    if (textcolor2 >= 0) {
      textcolor2 -= 10;
    }
  }
 
  
  if (textcolor2 >= 0) {
    push();
    rectMode(CENTER)
    textAlign(CENTER, CENTER)
    noStroke();
    fill(textcolor2)
    tint(255, textcolor2); // Display at half opacity
    image(img, width/20, 100 + 25 );
    textWithBlur("Who Am I?", 100 * 3 + 25, textcolor2, width / 20 + 5 , 25)
    textWithBlur("I’m Behnoosh Mohammadzadeh, a creative coder", 100 * 3 + 60, textcolor2, width / 20 , 13)
    textWithBlur("and Ph.D. student in Human-Computer Interaction", (100 * 3 + 60) + 30, textcolor2, width / 20 + 2, 13)
    textWithBlur("working on Collaborative Machine Teaching.", (100 * 3 + 60) + 60, textcolor2, width / 20, 13)
    textWithBlur("I’m interested in conducting collaborative ", (100 * 3 + 60) + 90, textcolor, width / 20, 13)
    textWithBlur("scenarios in Interactive Machine Learning among", (100 * 3 + 60) + 120, textcolor, width / 20, 13)
    textWithBlur("domain experts in artistic fields.", (100 * 3 + 60) + 150, textcolor, width / 20, 13)
    textWithBlur("Looking forward to your collective ideas!", (100 * 3 + 60) + 180, textcolor, width / 20, 13)
    pop();
  }


  push();
  for (var i = 0; i < vehicles.length; i++) {
    if (n == 2) {
      radius = 3.5 * sin(i / 60 + frameCount / 100);
      if (counter >= 0) {
        counter -= 0.002;
      } else {
        counter = 0;
      }
    } else if (n == 3) {
      if (i % 2 == 1) {
        radius = 8 * sin(i / 40 + frameCount / 30);
      } else {
        radius = 2 * sin(i / 40 + frameCount / 30);
      }
      if (counter <= 160) {
        counter += 0.001 * random();
      } else {
        counter = 160;
      }
    } else {
      radius = 2 * sin(i / 60 + frameCount / 100);
      if (counter >= 0) {
        counter -= 0.002;
      } else {
        counter = 0;
      }
    }
    var v = vehicles[i];
    var ln = ((i % 10) * 10 * ceil(i / 10));
    var lm = 80 * sin(radians(ln - w));
    if (ln * h < height + 500) {
      lnheight = ln * h;
    } else {
      if (i % 2 == 0) {
        lnheight = -100;
      } else {
        lnheight = height + 100;
      }
    }
    if (i % 2 == 0) {
      sw = 1;
    } else {
      sw = 0;
    }
    v.behaviors(n, sw, width / 2 + lm, lnheight, width / 2 - lm, lnheight + 15, random(width), random(height), (sin(i / 60 + frameCount / 100)), dt);
    v.update();
    v.show(radius, n, sw);
    v.spin(counter);
  }
  w++;
  pop();
}

function keyPressed() {
  clear()
  if (keyCode === LEFT_ARROW) {
    if (n > 0) {
      n -= 1;
      clear()
    }
    if (n < 2) {
      time = 0;
    }
  } else if (keyCode === RIGHT_ARROW) {
    if (n < 3) {
      n += 1;
      clear()
    }
  } else if (keyCode === UP_ARROW) {
    if (n > 0) {
      n -= 1;
      clear()
    }
    if (n < 2) {
      time = 0;
    }
  } else if (keyCode === DOWN_ARROW) {
    if (n < 3) {
      n += 1;
      clear()
    }
  }
}

function mouseWheel(event) {
  clear()
  if (event.delta > 0) {
    if (n < 3) {
      n += 1;
      clear()
    }
  } else {
    if (n > 0) {
      clear()
      n -= 1;
    }
    if (n < 2) {
      time = 0;
    }
  }
}


function textWithBlur(tmp, thisHeight, textcolor, space, textsize) {
  currentHeight = thisHeight;
  push()
  offset = space
  drawingContext.shadowBlur = 30
  drawingContext.shadowColor = color(textcolor)
  textSize(textsize)
  for (var i = 0; i < tmp.length; i++) {
    thisChar = tmp[i]
    text(thisChar, offset, currentHeight)
    offset += textsize / 1.2
  }
  pop()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}



function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  if (axis == "Y") { // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      var inter = map(i, y, y + h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis == "X") { // Left to right gradient
    for (let j = x; j <= x + w; j++) {
      var inter2 = map(j, x, x + w, 0, 1);
      var d = lerpColor(c1, c2, inter2);
      stroke(d);
      line(j, y, j, y + h);
    }
  }

}
