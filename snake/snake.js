var _score;

function createMatrix()
{
	var matrix = document.getElementById('matrix');
	var n = 20 * 20;	
	
	for (var i = 0; i < n; i++)
	{
		var div = document.createElement('div');
		div.className = 'cell';
		matrix.appendChild(div);
	}
}

function showScore()
{
	document.getElementById('score').innerHTML = _score;
}

function getCell(row, col)
{
}

function setCell(row, col, val)
{
}

window.onload = function()
{
	_score = 0;
	createMatrix();	
	showScore();	
}				
