class Punto {
    constructor(x, y) {
        this.pos_x = x;
        this.pos_y = y;

    }
    findMiddle(old_x, old_y) {
        let loc_x = (this.pos_x + old_x) / 2
        let loc_y = (this.pos_y + old_y) / 2
        let coord = new Punto(loc_x, loc_y);
        return coord;
    }
}
// canvas variables
var canvas_x = 600;
var canvas_y = 600;
var margin = 50;
var mainColor;
var vertColor;

var points = [];
var counter = 0;
var mainPoint = initializePoint();
var dotSize = 8;
function setup() {
    // color size and color
    mainColor = color(204, 102, 0);
    vertColor = color(0, 50, 150);
    // init canvas. just once
    createCanvas(canvas_x, canvas_y);
    background(200);
    ellipseMode(CENTER);
    noStroke();
    allRandom();

}

function draw() {
    if(pInput) {
        // playerInput();
    }
    else if(mouseIsPressed) {
        if(points.length == 0) {
            return;
        }
        let num = rollDice(points.length);
        console.log(points);
        console.log(num);
        mainPoint = points[num].findMiddle(mainPoint.pos_x, mainPoint.pos_y);
        fill(mainColor);
        drawPoint(mainPoint, dotSize - 3);
        counter++;
    }
}

var pInput = true;
function mousePressed() {
    if(pInput) {
        let newPoint = new Punto(mouseX, mouseY);
        points.push(newPoint);
        fill(vertColor);
        drawPoint(newPoint, dotSize);
    }
}

function allRandom() {
    background(200);
    points = [];
    let number = 3 // rollDice(4) + 1;
    for(let i = 0; i < number; i++) {
        points.push(initializePoint());
    }

    // draw points
    noStroke();
    fill(vertColor);
    for(let i = 0; i < points.length; i++) {
        drawPoint(points[i], dotSize); 
    }
    fill(mainColor);
    drawPoint(mainPoint, dotSize - 3); // main a little smaller
}
function keyPressed() {
    if(key === 'r' && pInput) {
        allRandom();
    } else if(keyCode === ENTER) {
        pInput = false;
    } else if(keyCode === BACKSPACE) {
        pInput = true;
        background(200);
        points = [];
        fill(mainColor);
        drawPoint(mainPoint, dotSize - 3);
    }
}


function initializePoint() {
    let pos_x = (Math.random() * (canvas_x - 2 * margin)) + margin;
    let pos_y = (Math.random() * (canvas_y - 2 * margin)) + margin;
    var newPoint = new Punto(pos_x, pos_y);

    return newPoint;
}

function drawPoint(punto, size) {
    ellipse(punto.pos_x, punto.pos_y, size, size);
}

function rollDice(numFaces) {
    let randomDice = Math.floor( numFaces * Math.random() );
    return randomDice;
}