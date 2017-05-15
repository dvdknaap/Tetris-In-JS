var snake;
var scoreboard;
var bottomCanvas;
var topCanvas;
var canvas;

function setup() {
	noLoop();
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent('snakeGame');

    // Create both of your off-screen graphics buffers
    topCanvas = createGraphics(windowWidth, 20);
    bottomCanvas = createGraphics(windowWidth, windowHeight-20);

	scoreboard = new scoreboard(topCanvas, windowWidth,20);

	snake = new snake(bottomCanvas, scoreboard, windowWidth,windowHeight-20);
	snake.setFoodLocation();
}

function draw() {
	snake.init();

	scoreboard.init(snake);

    // Paint the off-screen buffers onto the main canvas
    image(topCanvas, 0, 0);
    image(bottomCanvas, 0, 20);
}

// function mousePressed() {
// 	console.info(windowWidth, 'windowWidth');
// 	console.info(windowHeight, 'windowHeight');
//     fullscreen(!fullscreen());
// 	//snake.foodEaten();
// }

// function windowResized() {
// 	console.info(canvas, 'canvas');
// 	resizeCanvas(windowWidth, windowHeight);
// 	console.info(canvas, 'canvas');

// 	// Create both of your off-screen graphics buffers
// 	topCanvas = createGraphics(windowWidth, 20);
// 	bottomCanvas = createGraphics(windowWidth, windowHeight-20);

//     // Paint the off-screen buffers onto the main canvas
//     image(topCanvas, 0, 0);
//     image(bottomCanvas, 0, 20);
// }

function keyPressed() {

	if (!snake.snakeDetails.snakeStarted) {
		//spacebar or enter
		if ([ENTER, 32, 27].indexOf(keyCode) !== -1) { 
			clear();
			snake.snakeDetails.paused = 0;
			scoreboard.showScore();

			if (!snake.snakeDetails.alive) {
				snake.restartSnake();
				snake.setFoodLocation();
			}

			snake.snakeDetails.snakeStarted = true;
			snake.init();
			loop();
		}
	} else {

		if (keyCode === 27) {
			snake.snakeDetails.paused = 1;
			snake.snakeDetails.snakeStarted = false;
		} else if (keyCode == UP_ARROW) {
			snake.ChangeDir(0, -1);
		} else if (keyCode == DOWN_ARROW) {
			snake.ChangeDir(0, 1);
		} else if (keyCode == LEFT_ARROW) {
			snake.ChangeDir(-1, 0);
		} else if (keyCode == RIGHT_ARROW) {
			snake.ChangeDir(1, 0);
		}
	}
  return true; // prevent default
}