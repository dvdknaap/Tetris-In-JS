function snake(bottomCanvas, scoreboard, canvasWidth, canvasHeigh) {
	this.snakeSpeed = 10;
	this.snakeScale = 10;
	this.scoreMultiplier = 10;

	this.maxWidth = canvasWidth-this.snakeScale;
	this.maxHeight = canvasHeigh-this.snakeScale;
	this.foodLocation = {x:0, y:0};
	this.snakeDetails = {snakeStarted:false, alive:true, paused:false, size: 0, tail:[], pos: {x:1, y:1}, speed: {x:1, y:0}, score:0};

	this.grid = {x: floor(canvasWidth/this.snakeScale), y: floor(canvasHeigh/this.snakeScale)};

	this.init = function() {

		bottomCanvas.background('#f7e697');

		if (!snake.snakeDetails.snakeStarted) {
			bottomCanvas.textSize(16);
			bottomCanvas.textAlign(CENTER);
			bottomCanvas.fill('#333');

			if (!snake.snakeDetails.alive) {
				bottomCanvas.textStyle(BOLD);
				bottomCanvas.textAlign(CENTER);
				bottomCanvas.textSize(20);
				bottomCanvas.text("Score", (canvasWidth/2)-10, (canvasHeigh/2)-60);
				bottomCanvas.text(this.snakeDetails.score, (canvasWidth/2)-10, (canvasHeigh/2)-40);
				bottomCanvas.textStyle(NORMAL);
				bottomCanvas.textSize(12);
				bottomCanvas.text("Game over, press space to start over", (canvasWidth/2)-10, canvasHeigh/2);
			} else if (snake.snakeDetails.paused) {
				bottomCanvas.textAlign(CENTER);
				bottomCanvas.textSize(20);
				bottomCanvas.textStyle(BOLD);
				bottomCanvas.text("Score", (canvasWidth/2)-10, (canvasHeigh/2)-60);
				bottomCanvas.text(this.snakeDetails.score, (canvasWidth/2)-10, (canvasHeigh/2)-40);
				bottomCanvas.textStyle(NORMAL);
				bottomCanvas.textSize(12);
				bottomCanvas.text("Game paused, press space to resume", (canvasWidth/2)-10, canvasHeigh/2);
			} else {
				bottomCanvas.textAlign(CENTER);
				bottomCanvas.textStyle(BOLD);
				bottomCanvas.textAlign(LEFT);
				bottomCanvas.textSize(20);
				bottomCanvas.text("Snake v1.0", (canvasWidth/2)-100, (canvasHeigh/2)-100);


				bottomCanvas.textStyle(NORMAL);
				bottomCanvas.textSize(20);
				bottomCanvas.text("Press space to start game", (canvasWidth/2)-180, (canvasHeigh/2)-80);
			}
		} else {

			frameRate(this.snakeSpeed);
			this.showGame();
			this.updatePos();
		}
	};

	this.growSnakeSize = function() {
		this.snakeDetails.size++;
	}

	this.setFoodLocation = function () {
		this.foodLocation = bottomCanvas.createVector(floor(random(this.grid.x)), floor(random(this.grid.y)));
		//this.foodLocation = createVector(this.snakeDetails.size+10, 0);
		this.foodLocation.mult(this.snakeScale);
		$('.snakeFood span').text('x '+snake.foodLocation.x+' y:'+snake.foodLocation.y);
	}

	this.onFoodLocation = function () {
		if (dist(this.snakeDetails.pos.x, this.snakeDetails.pos.y, this.foodLocation.x, this.foodLocation.y) < 2) {
			return true;
		} else {
			return false;
		}
	}

	this.foodEaten = function () {
		this.setFoodLocation();
		scoreboard.updateScore();
		this.growSnakeSize();

		//Increase speed
		this.snakeSpeed += 0.5;
	}

	this.checkTailDistance = function () {
		if (this.snakeDetails.size === this.snakeDetails.tail.length) {
			for (var s = 0; s < this.snakeDetails.tail.length-1; s++) {
				if (dist(this.snakeDetails.pos.x, this.snakeDetails.pos .y, this.snakeDetails.tail[s].x, this.snakeDetails.tail[s].y) < 2) {
					return true;
				} else {
					return false;
				}
			}
		}
	}

	this.restartSnake = function () {
		this.snakeDetails.alive = true;
		this.snakeDetails.pos = {x:1, y:1};
		this.snakeDetails.speed = {x:1, y:0};
		this.snakeDetails.size = 0;
		this.snakeDetails.tail = [];
		this.snakeDetails.score = 0;
		scoreboard.showScore();
	}

	this.snakeDied = function () {
		this.snakeDetails.alive = false;
		this.snakeDetails.snakeStarted = false;
	}

	this.showGame = function () {

		//Set Snake head
		bottomCanvas.fill('#73b671');
		bottomCanvas.rect(this.snakeDetails.pos.x, this.snakeDetails.pos.y, this.snakeScale, this.snakeScale);

		bottomCanvas.fill('#73b671');
		//Set Snake tail
		for (var s = 0; s <= this.snakeDetails.tail.length-1; s++) {
			bottomCanvas.rect(this.snakeDetails.tail[s].x, this.snakeDetails.tail[s].y, this.snakeScale, this.snakeScale);
		}

		//Set food
		bottomCanvas.fill('#db4949');
		bottomCanvas.rect(this.foodLocation.x, this.foodLocation.y, this.snakeScale, this.snakeScale, 20);
	}

	this.ChangeDir = function (x, y) {
		this.snakeDetails.speed.x = x;
		this.snakeDetails.speed.y = y;
	}

	this.updatePos = function () {
		//Reset tail pos
		if (this.snakeDetails.size === this.snakeDetails.tail.length) {
			for (var s = 0; s < this.snakeDetails.tail.length-1; s++) {
				this.snakeDetails.tail[s] = this.snakeDetails.tail[s+1];
			}
		}

		this.snakeDetails.tail[this.snakeDetails.size-1] = bottomCanvas.createVector(this.snakeDetails.pos.x,this.snakeDetails.pos.y);

		this.snakeDetails.pos.x += this.snakeDetails.speed.x*this.snakeScale;
		this.snakeDetails.pos.y += this.snakeDetails.speed.y*this.snakeScale;

		this.snakeDetails.pos.x = constrain(this.snakeDetails.pos.x, 0, this.maxWidth);
		this.snakeDetails.pos.y = constrain(this.snakeDetails.pos.y, 0, this.maxHeight);

		//Snake eat his food
		if (this.onFoodLocation()) {
			this.foodEaten();
		}

		//Check if we hitted the left or right line
		if ([0, this.maxWidth].indexOf(this.snakeDetails.pos.x) !== -1) {
			this.snakeDied();
		//Check if we hitted the top or bottom line
		} else if ([0, this.maxHeight].indexOf(this.snakeDetails.pos.y) !== -1) {
			this.snakeDied();
		//Check if we hit an tail
		} else if (this.checkTailDistance()) {

			this.snakeDied();
		}
	}
	
}