function scoreboard(topCanvas, canvasWidth, canvasHeigh) {
	this.snake;

	this.init = function(snake) {
		this.snake = snake;

		if (snake.snakeDetails.snakeStarted) {
			topCanvas.background('rgba(0,255,0, 0.25)');
			this.showScore();
		} else {

			topCanvas.background('#f7e697');
		}
	}

	this.updateScore = function () {
		this.snake.snakeDetails.score += this.snake.scoreMultiplier;
		this.showScore();
	}

	this.showScore = function () {		
		topCanvas.textStyle(BOLD);
		topCanvas.textAlign(LEFT);
		topCanvas.text("Snake v1.0", 40, 15);

		topCanvas.textStyle(NORMAL);
		topCanvas.textAlign(RIGHT);
		topCanvas.text('Score: '+this.snake.snakeDetails.score, canvasWidth-40, 15);
	}
}