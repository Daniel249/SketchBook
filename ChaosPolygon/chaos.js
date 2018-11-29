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
var canvas_x = 1200;
var canvas_y = 800;
var margin = 50;
var mainColor;
var vertColor;

var points = [];
var counter = 0;
var mainPoint = initializePoint();
var dotSize = 2;
var vertSize = 10;
var lastPoint;
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
// Rule is on or off. Rule: can't repeat vertex
var ruleCantRepeatOn = false;
function draw() {
     if(mouseIsPressed && !pInput) {
        if(points.length == 0) {
            return;
        }
        for(let i = 0; i < 1000; i++) {
            let num = rollDice(points.length);
            while(lastPoint === points[num] && ruleCantRepeatOn) {
                num = rollDice(points.length);
            }
            // logs
            // console.log(points);
            // console.log(num);
            mainPoint = points[num].findMiddle(mainPoint.pos_x, mainPoint.pos_y);
            lastPoint = points[num];
            
            // draw dot
            fill(mainColor);
            drawPoint(mainPoint, dotSize);
            counter++;
        }
    }
}

var pInput = true;
// add vertice by clicking
function mousePressed() {
    // if in input state
    if(pInput) {
        let newPoint = new Punto(mouseX, mouseY);
        points.push(newPoint);
        // draw it
        fill(vertColor);
        drawPoint(newPoint, vertSize);
    }
}
// resets and adds 3 random vertices
function allRandom() {
    // reset
    background(200);
    points = [];
    // add 3 random vertices
    let number = 3 // rollDice(4) + 1;
    for(let i = 0; i < number; i++) {
        points.push(initializePoint());
    }
    // draw vertices
    noStroke();
    fill(vertColor);
    for(let i = 0; i < points.length; i++) {
        drawPoint(points[i], vertSize); 
    }
    // redraw current dot because of background()
    fill(mainColor);
    drawPoint(mainPoint, dotSize); // main a little smaller
}

// handle key presses
function keyPressed() {
    if(key === 'r' && pInput) {
        // resets vertices and background. then adds and draws new ones
        allRandom();
    } else if(keyCode === ENTER) {
        // playerInput state -> run state
        pInput = false;
        // set if rule is on or off. Rule: can't repeat same vertex
        // ruleCantRepeatOn = document.querySelector('inputRule').checked // intento fallido
        var elementCheckBox = document.getElementById("IdOfCheckBox");
        ruleCantRepeatOn = document.getElementById("ruleCheck").checked;
    } else if(keyCode === BACKSPACE) {
        // reset everything and redraw dot
        pInput = true;
        background(200);
        points = [];
        fill(mainColor);
        drawPoint(mainPoint, dotSize);
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