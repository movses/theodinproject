var _score;
var _initialState = [20,10];
var _direction = "r"; 
var _initialSize = 3;



function createMatrix() {
	var matrix = document.getElementById('matrix');
	var n = 40 * 40;	
	
	for (var i = 0; i < n; i++)
	{
		var div = document.createElement('div');
		div.className = 'cell';
		matrix.appendChild(div);
	}
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

function defaultBehavour() {
	var i;
	var snakeSize = _initialSize;
	var currentState = _initialState;
	setCell(currentState[0], currentState[1], "blue");
	setCell(currentState[0], currentState[1] - snakeSize, "white");
	currentState[1] += 1;
}

function initializeSnake() {
	for (i = 0; i < snakeSize; i++) {
		setCell(currentState[0], currentState[1], "blue");
		currentState[1] += 1;
	} 
}
function render() {
	_score = 0;
	createMatrix();	
	showScore();
	initializeSnake();
}

window.setInterval(defaultBehavour,200);
window.onload = render;		
