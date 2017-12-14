function scoreboard(topCanvas, canvasWidth, canvasHeigh) {
	this.tetris;

	this.init = function(tetris) {
		this.tetris = tetris;

		print(canvasWidth, 'canvasWidth');
		print(canvasHeigh, 'canvasHeigh');
		topCanvas.background('#d5e6f7');

		//Left line
		topCanvas.stroke('#7788aa');
		topCanvas.strokeWeight(5); 
		topCanvas.line(2, 2, 2, canvasHeigh);

		//Top line
		topCanvas.stroke('#7788aa');
		topCanvas.strokeWeight(5); 
		topCanvas.line(canvasHeigh, 2, 2, 2);

		//Right line
		topCanvas.stroke('#7788aa');
		topCanvas.strokeWeight(5); 
		topCanvas.line(canvasHeigh-232, 0, canvasHeigh-232, canvasHeigh);

		//Right line
		topCanvas.stroke('#7788aa');
		topCanvas.strokeWeight(5); 
		topCanvas.line(canvasWidth, canvasHeigh-2, 0, canvasHeigh-2);
	}

	this.updateScore = function () {
	}

	this.showScore = function () {	
	}
}