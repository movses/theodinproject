$(document).ready( function() {
	var player = 0;

	var cells = [];
	var cols = 3;

	//init the cells matrix
	for ( var i = 0; i < cols; i++ ) {
	    cells[i] = []; 
	}
	
	$("div .cell").click(function () {
		togglePlayer();
		if (!$(this).hasClass('xImg') && !$(this).hasClass('yImg')) {
			var index = $(this).index();
			var row = Math.floor(index / 3);
			var col = index % 3;
			if(player === 1 ) {				
				$(this).addClass('xImg');
				cells[row][col] = 1;
				checkVictory(row, col);
			} else {
				$(this).addClass('yImg');
				cells[row][col] = 0;
				checkVictory(row, col);
			}
		}
	});

	function togglePlayer() {
		player = 1 - player;
	}

	function checkVictory(row, col) {
		var rowMatch = 0;
		var colMatch = 0;
		var diagMatch = 0;
		var allDefined = true;

		// check row
		for(var i = -2; i < 2; i++) {			
			if( undefined !== typeof cells[row][col + i] && cells[row][col+i] === cells[row][col]) {
				rowMatch++;
			}
		}
		if (rowMatch === 3) {
			alert("player " + cells[row][col] + " won!");
		}

		// check column
		for(var i = -2; i < 2; i++) {			
			if( undefined !== typeof cells[row + i][col] && cells[row + i][col] === cells[row][col]) {
				colMatch++;
			}
		}
		if (colMatch === 3) {
			alert("player " + cells[row][col] + " won!");
		}

		// check diagonal
		for(var i = -2; i < 2; i++) {			
			if( undefined !== typeof cells[row + i][col + i] && cells[row + i][col + i] === cells[row][col]) {
				diagMatch++;
			}
		}
		if (diagMatch === 3) {
			alert("player " + cells[row][col] + " won!");
		}

		// check draw
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				if (undefined == cells[i][j]) {
					allDefined = false;
					break;
				}
			}
		}

		if (allDefined) {
			alert ("draw");
		}
	}
});
