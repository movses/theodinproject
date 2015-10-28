var _score;
var _direction;
var _timerRef;

var snake;

function createMatrix() {
	var matrix = document.getElementById('matrix');
	var n = 40 * 40;
	
	for (var i = 0; i < n; i++) {
		var div = document.createElement('div');
		div.className = 'cell';
		matrix.appendChild(div);
	}
}

function getScore() {
	return _score;
}

function setScore(score) {
	_score = score;
}

function getHead() {
	return snake[snake.length - 1].slice();
}

function getTail() {
	return snake[0].slice();
}
function showScore() {
	document.getElementById('score').innerHTML = _score;
}

function getCell(row, col) {
	var cells = document.getElementsByClassName("cell");
	var currentIndex = getCurrentIndex(row, col);
	return cells[currentIndex];
}

function setCell(row, col, val) {
	var cells = document.getElementsByClassName("cell");
	var cellIndex = getCellIndex(row, col);
	cells[cellIndex].style.backgroundColor = val;
}

function getCellIndex(row, col) {
	return row * 40 + col;
}

function cleanUp() {
	var n = 40;
	for (var i = 0; i < n; i++) {
		for (var j = 0; j < n; j++ )
		setCell(i, j, "white");
	}
	window.clearInterval(_timerRef);
}

function initializeSnake() {
	_score = 0;
	_direction = 'r';
	snake = [[20,5], [20,6], [20,7]];
	for (i = 0; i < snake.length; i++) {
		setCell(snake[i][0], snake[i][1], "blue");
	}
}

function restart() {
	cleanUp();
	start();
}

function play() {
	move(_direction);
}
function start() {
	initializeSnake();
	_timerRef = window.setInterval(play,200);
}

function render() {
	createMatrix();
	start();
	showScore();
}

document.onkeydown = function(e) {
	switch (e.keyCode) {
		case 37:
			if(_direction !== 'l' && _direction !== 'r') {
				_direction = 'l';
				move(_direction);
			}
			break;
		case 38:
			if(_direction !== 'u' && _direction !== 'd') {
				_direction = 'u';
				move(_direction);
			}
			break;
		case 39:
			if(_direction !== 'l' && _direction !== 'r') {
				_direction = 'r';
				move(_direction);
			}
			break;
		case 40:
			if(_direction !== 'u' && _direction !== 'd') {
				_direction = 'd';
				move(_direction);
			}
			break;
	}
};

function move(direction) {
	switch(direction) {
		case 'l':
			moveLeft();
			break;
		case 'r':
			moveRight();
			break;
		case 'u':
			moveUp();
			break;
		case 'd': 
			moveDown();
			break;
	}
}

function moveUp() {
	var head = getHead();
	var tail = getTail();	

	head[0] -= 1;
	if(head[0] < 0) {
		restart();
	} else {
		setCell(head[0], head[1], "blue");
		setCell(tail[0], tail[1], "white");
		snake.push(head);
		snake.shift();
	}
}

function moveLeft() {
	var head = getHead();
	var tail = getTail();

	head[1] -= 1;
	if(head[1] < 0) {
		restart();
	} else {
		setCell(head[0], head[1], "blue");
		setCell(tail[0], tail[1], "white");
		snake.push(head);
		snake.shift();
	}
}

function moveRight() {
	var head = getHead();
	var tail = getTail();	
	
	head[1] += 1;
	if(head[1] > 39) {
		restart();
	} else {
		setCell(head[0], head[1], "blue");
		setCell(tail[0], tail[1], "white");
		snake.push(head);
		snake.shift();
	}
}

function moveDown() {
	var head = getHead();
	var tail = getTail();	

	head[0] += 1;
	if(head[0] > 39) {
		restart();
	} else {
		setCell(head[0], head[1], "blue");
		setCell(tail[0], tail[1], "white");
		snake.push(head);
		snake.shift();
	}
}
 

window.onload = render;		
