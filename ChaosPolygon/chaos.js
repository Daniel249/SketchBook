// simple coordinate class
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
// color and size for vertex and dots
var mainColor;
var vertColor;
var dotSize = 2; // player input through inputSize
var vertSize = 10;
// vertex array
var points = [];
// turn counter
var counter = 0;
// first dot. automatically initiallized
var mainPoint = initializePoint();
// helper for rule: cant repeat last dot
var lastPoint;
// how many loops per draw call. player input through inputSpeed
var turnsPerFrame = 1000;
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
    // check for ENTER and playerInput state
     if(keyIsDown(13) && !pInput) {
         // if no vertex in array, dont even roll dice
        if(points.length == 0) {
            return;
        }
        // loop turnsPerFrame times
        for(let i = 0; i < turnsPerFrame; i++) {
            // roll dice until differente to lastPoint, if "rule: cant repeat" is on
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
        // if mouse inside canvas
        if(mouseX > 0 && mouseX < canvas_x) {
            if(mouseY > 0 && mouseY < canvas_y) {
                // create vertex and add to array
                let newPoint = new Punto(mouseX, mouseY);
                points.push(newPoint);
                // draw it
                fill(vertColor);
                drawPoint(newPoint, vertSize);
            }
        }
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
        if(pInput) {
            // playerInput state -> run state
            pInput = false;
            // update settings: ruleCantRepeatOn, dotSize and turnsPerFrame
            updateSetings();
        }

        // set if rule is on or off. Rule: can't repeat same vertex
        // ruleCantRepeatOn = document.querySelector('inputRule').checked // intento fallido
        // var elementCheckBox = document.getElementById("IdOfCheckBox");
        
    } else if(keyCode === BACKSPACE) {
        // reset everything and redraw dot
        pInput = true; // go back to player input state
        background(200);
        points = [];

        fill(mainColor);
        drawPoint(mainPoint, dotSize);
    }
}

// update run settings. get values from input types and try to apply them
function updateSetings() {
    // update bool rule. Rule: cant repeat vertex
    ruleCantRepeatOn = document.getElementById("inputRule").checked;
    // update dot size
    let numCheck = document.getElementById("inputSize").value;
    if( !isNaN(numCheck) ) {
        dotSize = numCheck / 10;
    } else { 
        // If not a number alert player
    }
    // update turns per frame
    numCheck = document.getElementById("inputSpeed").value;
    if( !isNaN(numCheck) ) {
        turnsPerFrame = numCheck;
    } else { 
        // If not a number alert player
    }
}

// creates a point in a random position with margin in mind
function initializePoint() {
    let pos_x = (Math.random() * (canvas_x - 2 * margin)) + margin;
    let pos_y = (Math.random() * (canvas_y - 2 * margin)) + margin;
    var newPoint = new Punto(pos_x, pos_y);

    return newPoint;
}

// takes a point and a size and draws it
function drawPoint(punto, size) {
    ellipse(punto.pos_x, punto.pos_y, size, size);
}
// get number between 0 and numFaces - 1
function rollDice(numFaces) {
    let randomDice = Math.floor( numFaces * Math.random() );
    return randomDice;
}