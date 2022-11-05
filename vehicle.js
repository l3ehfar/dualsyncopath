function Vehicle(x, y) {
  this.pos = createVector(random(width), random(height));
  this.target = createVector(x, y);
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  this.maxspeed = 15;
  this.maxforce = 1;
  this.tar = createVector(0, 0);
  this.arrivemult = 1;
  this.fleemult = 5;
}

Vehicle.prototype.behaviors = function (turn, sw, dna_x, dna_y, dnaTwin_x, dnaTwin_y, waveX, waveY, destroy, dt) {
  this.dna = createVector(dna_x, dna_y);
  this.dnaTwin = createVector(dnaTwin_x, dnaTwin_y);
  if (turn == 1) {
    if (destroy >= dt && destroy <= 1) {
      this.tar = createVector(waveX, waveY);
    } else {
      this.tar = this.target;
    }
    // if(sw2 == 1){
    // this.tar = createVector(waveX, waveY);
    // }else{
    //   this.tar = this.target;
    // }
    var flee_extra = createVector(random(width / 2.5, 2 * width / 2.5), random(0, height));
    this.arrivemult = 0.5 * random();
    this.fleemult = 1 * random();
    this.maxforce = 1;
    var flee_ex = this.flee(flee_extra);
    flee_ex.mult(this.fleemult);
    this.applyForce(flee_ex);
  } else if (turn == 2) {
    this.tar = this.dnaTwin;
    this.arrivemult = 0.5 * random();
    this.fleemult = 5 * random();
    this.maxforce = 1;
    var flee_extra = createVector(random(width / 2.5, 2 * width / 2.5), random(0, height));
    var flee_ex = this.flee(flee_extra);
    flee_ex.mult(this.fleemult);
    this.applyForce(flee_ex);

  } else if (turn == 3) {
    if (sw == 0) {
      this.tar = this.dna;
    } else {
      this.tar = this.dnaTwin;
    }
    this.arrivemult = 0.3 * random();
    this.fleemult = 1 * random();
    this.maxforce = 1;
  } else {
    this.tar = this.target;
    this.arrivemult = 1;
    this.fleemult = 5;
    this.maxSpeed = 20;
  }
  var arrive = this.arrive(this.tar);
  var mouse = createVector(mouseX, mouseY);
  var flee = this.flee(mouse);
  flee.mult(this.fleemult);
  this.applyForce(flee);

  arrive.mult(this.arrivemult);
  this.applyForce(arrive);
};

Vehicle.prototype.applyForce = function (f) {
  this.acc.add(f);
};

Vehicle.prototype.update = function () {
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
};

Vehicle.prototype.show = function (radius, n, sw) {
  this.radius = radius;
  if (n == 3) {
    if (this.pos.y > 0 && this.pos.y < height && sw == 0) {
      stroke(255, 255);
      strokeWeight(this.radius / 3);
      point(this.pos.x, this.pos.y);
      stroke(255, 120);
      strokeWeight(this.radius / 2);
      point(this.pos.x, this.pos.y);
      stroke(255, 50);
      strokeWeight(this.radius);
      point(this.pos.x, this.pos.y);
    } else {
      stroke(255);
      strokeWeight(this.radius);
      point(this.pos.x, this.pos.y);
    }
  } else {
    stroke(255);
    strokeWeight(this.radius);
    point(this.pos.x, this.pos.y);
  }
};

Vehicle.prototype.arrive = function (target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  var speed = this.maxspeed;
  if (d < 100) {
    speed = map(d, 0, 100, 0, this.maxspeed);
  }
  desired.setMag(speed);
  var steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxforce);
  return steer;
};

Vehicle.prototype.flee = function (target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  if (d < 30) {
    desired.setMag(this.maxspeed);
    desired.mult(-1);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
};

Vehicle.prototype.spin = function (counter) {
  if (abs(this.pos.x - this.dna.x) <= counter && abs(this.pos.x - this.dnaTwin.x) <= counter) {
    stroke(255)
    noFill();
    strokeWeight(1);
    beginShape();
    vertex(this.dna.x, this.dna.y);
    vertex(this.dnaTwin.x, this.dnaTwin.y);
    endShape();
  }
};
