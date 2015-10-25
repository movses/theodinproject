var _score;
var _startPoint;
var _snakeSize;
var _head;
var _tail;
var _direction;
var _timerRef;

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

function getSnakeSize() {
	return _snakeSize;
}

function setSnakeSize(snakeSize) {
	_snakeSize = snakeSize;
}

function getHead() {
	return _head;
}

function setHead(head) {
	_head = head;
}

function setTail(tail) {
	_tail = tail;
}

function getTail() {
	return _tail;
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
	_startPoint = [20,5];
	_snakeSize = 3;
	_direction = 'r';
	setTail([20,5]);
	setHead([20,5 + _snakeSize - 1])
	for (i = 0; i < _snakeSize; i++) {
		setCell(_startPoint[0], _startPoint[1], "blue");
		_startPoint[1] += 1;
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
			_direction = 'l';
			break;
		case 38:
			_direction = 'u';
			break;
		case 39:
			_direction = 'r';
			break;
		case 40:
			_direction = 'd';
			break;
	}
	move(_direction);
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
	var snakeSize = getSnakeSize();
	var tail = getTail();	

	head[0] -= 1;
	setCell(head[0], head[1], "blue");
	setCell(tail[0], tail[1], "white");	
	tail[1] -= 1;
	setHead(head);
	setTail(tail);
	if(head[0] < 0) {
		restart();
	}
}

function moveLeft() {
	var head = getHead();
	var snakeSize = getSnakeSize();
	var tail = getTail();

	head[1] -= 1;
	setCell(head[0], head[1], "blue");
	setCell(tail[0], tail[1] - snakeSize, "white");
	tail[1] -= 1;
	setHead(head);
	setTail(tail);
	if(head[1] < 0) {
		restart();
	}
}

function moveRight() {
	var head = getHead();
	var snakeSize = getSnakeSize();
	var tail = getTail();	
	
	head[1] += 1;
	setCell(head[0], head[1], "blue");
	setCell(tail[0], tail[1], "white");
	tail[1] += 1;
 
	setHead(head);
	setTail(tail);

	if(head[1] > 39) {
		restart();
	}
}

function moveDown() {
	var head = getHead();
	var snakeSize = getSnakeSize();
	var tail = getTail();	

	head[0] += 1;
	setCell(head[0], head[1], "blue");
	setCell(tail[0], tail[1], "white");
	tail[1] += 1;
	setHead(head);
	setHead(tail);

	if(head[0] > 39) {
		restart();
	}
}
 

window.onload = render;		
