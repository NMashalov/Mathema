// Animated Spark Festival Logo
// Rob Lloyd. r.w.lloyd@gmail.com. 
// March 2019.

// Array of ring objects
let rings = [];
let img;

// Load assets
function preload() {
  img = loadImage('assets/SparkLogoFront.png');
}

function setup() {
  //createCanvas(750, 446); // Original image size
  //createCanvas(850, 600); // Extended canvas to keep animation in view
  createCanvas(850, 595); // Extended canvas to keep animation in view
	clear();
  noFill();
  // Define colours
  red = color(231, 48, 42);
  lightBlue = color(187, 227, 250);
  pink = color(230, 24, 115);
  blue = color(45, 170, 225);
  darkBlue = color(0, 159, 227);
  green = color(150, 193, 31);
	
  // Initiate gear object
  gear = new Gear(0, 0, 34, 3, pink);
	// Initiate some ring objects
  // xpos, ypos, diameter, start angle, arc length, weight, color
  rings[0] = new Ring(0, 0, 126, 204.0, radians(239.0), 22, green);
  rings[1] = new Ring(0, 0, 172, 146.0, radians(113.0), 14, red);
  rings[2] = new Ring(0, 0, 190, 154.0, radians(183.0), 9, 255);
  rings[3] = new Ring(0, 0, 172, 346.0, radians(60.0), 14, red);
  rings[4] = new Ring(0, 0, 230, 140.0, radians(239.0), 15, green);
  rings[5] = new Ring(0, 0, 252, 188.0, radians(283.0), 12, darkBlue);
  rings[6] = new Ring(0, 0, 288, 143.0, radians(297.0), 13, pink);
  rings[7] = new Ring(0, 0, 398, 199.0, radians(73.0), 13, green);
  rings[8] = new Ring(0, 0, 402, 64.0, radians(115.0), 25, red);
  rings[9] = new Ring(0, 0, 514, 196.0, radians(69.0), 15, darkBlue);
}

function draw() {
  clear();
  // Comment out next line for transparent background
  //background(16, 8, 6);
  push();
  //translate(527, 219); // for original size
  translate(577, 296); // for 800 x 600
  // Draw Small Blue ring
  stroke(darkBlue);
  strokeWeight(1);
  ellipse(0, 0, 24, 24);
  // Draw the Light Blue Ring
  strokeWeight(5);
  stroke(lightBlue);
  ellipse(0, 0, 344, 344);
  // Update and Display ring objects 
  for (let i = 0; i < rings.length; i++) {
    rings[i].update();
    rings[i].display();
  }
  // Update and draw Gear
  gear.update();
  gear.display();
  // Draw the ticker
  stroke(darkBlue);
  strokeWeight(2);
  rotate(PI);
  // Why not make it a timer? 60 ticks, 6 degrees between each
  for (let i = 0; i < second(); i++) {
    rotate(radians(6));
    // tick line, 13 pixels long
    line(0, 35, 0, 48);
  }
  pop();
  // Draw Lettering from PNG file
  //image(img, 0, 0); // for original image size
  image(img, 50, 77); // for 800 x 600 canvas 

}

class Ring {

  // xpos, ypos, diameter, start angle, arc length, weight, color
  constructor(x, y, d, start, arc, w, c) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.start = start;
    this.arc = arc;
    this.c = c;
    this.w = w;
    this.direction = -1;
    this.salt = random(-5, 5);
  }

  display() {
    strokeWeight(this.w);
    strokeCap(SQUARE);
    stroke(this.c);
    arc(this.x, this.y, this.d, this.d, this.start, this.start + this.arc);
  }

  update() {
    this.pos = map(mouseX, 0, width, -TWO_PI / 500, TWO_PI / 500);
    this.start = this.start + (this.pos * this.direction * this.salt);
  }
}

class Gear {
  // x position, y position, diameter, 
  constructor(x, y, d, t, c) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.t = t;
    this.c = c;
    this.a = 0;
  }

  display() {
    push();
    stroke(this.c);
    noFill();
    strokeWeight(this.t);
    arc(0, 0, this.d, this.d, 0.0, TWO_PI / 0.9);
    fill(this.c);
    noStroke();
    rotate(radians(this.a));
    for (let i = 0; i < 16; i++) {
      rotate(radians(22.5));
      rectMode(CENTER);
      rect(0, (this.d / 2) + (this.t - 1), this.t + 1, this.t);
    }
    pop();
  }

  update() {
    this.a += random(0.5, 1);
  }
}