var tetris;
var scoreboard;
var rightCanvas;
var leftCanvas;
var canvas;

function setup() {
	noLoop();
	canvas = createCanvas(670, 450);
	canvas.parent('tetrisGame');

    // Create both of your off-screen graphics buffers
    leftCanvas = createGraphics(450, 450);
    rightCanvas = createGraphics(220, 450);

	scoreboard = new scoreboard(rightCanvas, 220,450);

	tetris = new tetris(leftCanvas, scoreboard, 450,450);
}

function draw() {
	tetris.init();

	scoreboard.init(tetris);

    // Paint the off-screen buffers onto the main canvas
    image(leftCanvas, 0, 0);
    image(rightCanvas, 450, 0);
}

function keyPressed() {

  return true; // prevent default
}