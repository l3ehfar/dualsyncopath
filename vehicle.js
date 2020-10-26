function Vehicle(x, y) {
  this.pos = createVector(random(width), random(height));
  this.target = createVector(x, y);
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  this.maxspeed = 15;
  this.maxforce = 1;
  this.tar = createVector(0,0);
  this.arrivemult = 1;
  this.fleemult = 5;
}

Vehicle.prototype.behaviors = function(turn,sw,dna_x, dna_y, dnaTwin_x, dnaTwin_y) {
  this.dna = createVector(dna_x,dna_y);
  this.dnaTwin = createVector(dnaTwin_x, dnaTwin_y);
  if(turn == 0){
    if(sw == 0){
    this.tar = this.dna;
    }else{
      this.tar = this.dnaTwin;
    }
    this.arrivemult = 0.5*random();
    this.fleemult = 5*random();
    this.maxforce = 1;
  }else{
    this.tar = this.target;
    this.arrivemult = 1;
    this.fleemult = 5;
    this.maxSpeed = 20;
  }
  var arrive = this.arrive(this.tar);
  var mouse = createVector(mouseX, mouseY);
  var flee = this.flee(mouse);

  arrive.mult(this.arrivemult);
  flee.mult(this.fleemult);

  this.applyForce(arrive);
  this.applyForce(flee);
};

Vehicle.prototype.applyForce = function(f) {
  this.acc.add(f);
};

Vehicle.prototype.update = function() {
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
};

Vehicle.prototype.show = function(radius) {
  this.radius = radius;
  stroke(255);
  strokeWeight(this.radius);
  point(this.pos.x, this.pos.y);
};

Vehicle.prototype.arrive = function(target) {
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

Vehicle.prototype.flee = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  if (d < 50) {
    desired.setMag(this.maxspeed);
    desired.mult(-1);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
};

Vehicle.prototype.spin = function(counter) {
  if(abs(this.pos.x - this.dna.x) <= counter && abs(this.pos.x - this.dnaTwin.x) <= counter){
  stroke(255)
  noFill();
  strokeWeight(1);
  beginShape();
  vertex(this.dna.x, this.dna.y);
  vertex(this.dnaTwin.x, this.dnaTwin.y);
  endShape();
  }
};