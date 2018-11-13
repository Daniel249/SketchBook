function setup() {
	createCanvas(canvasSize, canvasSize);
	// initialize an ammount of Dots
	var ammountDots = 10;
	initDots(ammountDots);
}
var canvasSize = 600;
var squareSize = 500;
var squareX = (canvasSize - squareSize) / 2;
var squareY = (canvasSize - squareSize) / 2;

var Dots = []

function draw() {
	background(200);

	// draw Red Square
	noFill();
	stroke(255, 0, 0);
	rect(squareX, squareY, squareSize, squareSize)
	ellipse(squareX, squareY, 50, 50)
	// draw Point
	for (var i = 0; i < Dots.length; i++) {
		Dots[i].update();
		Dots[i].checkCollision();
		Dots[i].drawLines();
	}

}


function Punto() {
    // color rgb
    this.color_r = Math.floor(Math.random() * 255)
    this.color_g = Math.floor(Math.random() * 255)
    this.color_b = Math.floor(Math.random() * 255)

	// position relative to square
	this.pos_x = squareX + Math.floor(Math.random() * squareSize);
    this.pos_y = squareY + Math.floor(Math.random() * squareSize);
	// random velocity
	this.angle = Math.random() * TWO_PI;
	this.speed_x = sin(this.angle) * 6;
    this.speed_y = cos(this.angle) * 6;
    
	// array of lines
	this.lines_x = [];
	this.lines_y = [];

	// update position and draw
	this.update = function() {
		this.pos_x = this.pos_x + this.speed_x;
		this.pos_y = this.pos_y + this.speed_y;
		// set color blue
		fill(this.color_r, this.color_g, this.color_b);
		// disable outline when drawing
		noStroke();
		// draw
		ellipse(this.pos_x, this.pos_y, 10, 10);
	}

	// check if collision with square
	this.checkCollision = function() {
		if (this.pos_x <= squareX || this.pos_x >= squareX + squareSize) {
			// reverse horizontal speed
			this.speed_x *= -1;
			//save collision point to array
			this.lines_x.push(this.pos_x);
			this.lines_y.push(this.pos_y);
		} else if (this.pos_y <= squareY || this.pos_y >= squareY + squareSize) {
			this.speed_y *= -1;
			this.lines_x.push(this.pos_x);
			this.lines_y.push(this.pos_y);
		}
	}
	// draw lines for each adjacent coordinates in lines_x/y arrays
	this.drawLines = function() {
		var last_x = this.lines_x[0];
		var last_y = this.lines_y[0];
		// change color to green
		stroke(this.color_r, this.color_g, this.color_b);
		// loop from second position in array
		for (var i = 1; i < this.lines_x.length; i++) {
			// draw line from last saved point to current point
			line(last_x, last_y, this.lines_x[i], this.lines_y[i]);
			// update lastSavedPoint = current point
			last_x = this.lines_x[i];
			last_y = this.lines_y[i];
		}
		// draw from last point in array to current position of Punto
		line(last_x, last_y, this.pos_x, this.pos_y);

	}
}

function initDots(num) {
	for (var i = 0; i < num; i++) {
		var punto = new Punto();
		Dots.push(punto);
	}
}