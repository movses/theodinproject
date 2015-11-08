$(document).ready( function() {
	var player = 1;

	var cells = [];
	var $cols = 3;
	var $rows = 3

	//init the cells matrix
	for ( var i = 0; i < $cols; i++ ) {
	    cells[i] = []; 
	}
	
	function getPlayerSymbol(cell) {
		if (cell === 1) {
			return "X";
		} else if (cell === 0) {
			return "Y";
		}
	}

	$("div .cell").click(function () {
		if (!$(this).hasClass('xImg') && !$(this).hasClass('yImg')) {
			var index = $(this).index();
			var row = Math.floor(index / 3);
			var col = index % 3;
			if (player === 1) {				
				$(this).addClass('xImg');
				cells[row][col] = 1;
				checkVictory(row, col);
			} else {
				$(this).addClass('yImg');
				cells[row][col] = 0;
				checkVictory(row, col);
			}
		}
		togglePlayer();
	});

	function togglePlayer() {
		player = 1 - player;
	}

	function checkVictory(row, col) {
		var rowMatch = 0;
		var colMatch = 0;
		var diag1Match = 0;
		var diag2Match = 0;
		var allDefined = true;

		// check row
		for(var i = -2; i < 3; i++) {			
			if ((col + i) < 0 || (col + i) >= $cols) {
				continue;
			}	
			if (undefined !== typeof cells[row][col + i] && cells[row][col+i] === cells[row][col]) {
				rowMatch++;
			}
		}
		if (rowMatch === 3) {
			var playerSymbol = getPlayerSymbol(cells[row][col]); 
			$('#message').text("Player " + playerSymbol + " won!");
			if (playerSymbol === "X") {
				$('#message').css('color', 'green');
			} else {
				$('#message').css('color', 'red');
			}
			$("div .cell").off('click');
			return;
		}

		// check column
		for(var i = -2; i < 3; i++) {
			if ((row + i) < 0 || (row + i) >= $rows) {
				continue;
			}	
			if (undefined !== typeof cells[row + i][col] && cells[row + i][col] === cells[row][col]) {
				colMatch++;
			}
		}
		if (colMatch === 3) {
			var playerSymbol = getPlayerSymbol(cells[row][col]); 
			$('#message').text("Player " + playerSymbol + " won!");
			if (playerSymbol === "X") {
				$('#message').css('color', 'green');
			} else {
				$('#message').css('color', 'red');
			}
			$("div .cell").off('click');
			return;
		}

		// check diagonal 1 
		for(var i = -2; i < 3; i++) {			
			if ((row + i) < 0 || (row + i) >= $rows) {
				continue;
			}	
			if ((col + i) < 0 || (col + i) >= $cols) {
				continue;
			}	
			if (undefined !== typeof cells[row + i][col + i] && cells[row + i][col + i] === cells[row][col]) {
				diag1Match++;
			}
		}
		if (diag1Match === 3) {
			var playerSymbol = getPlayerSymbol(cells[row][col]); 
			$('#message').text("Player " + playerSymbol + " won!");
			if (playerSymbol === "X") {
				$('#message').css('color', 'green');
			} else {
				$('#message').css('color', 'red');
			}
			$("div .cell").off('click');
			return;
		}

		// check diagonal 2
		for(var i = -2; i < 3; i++) {
			if ((row - i) < 0 || (row - i) >= $rows) {
				continue;
			}	
			if ((col + i) < 0 || (col + i) >= $cols) {
				continue;
			}	
			if (undefined !== typeof cells[row - i][col + i] && cells[row - i][col + i] === cells[row][col]) {
				diag2Match++;
			}
		}
		if (diag2Match === 3) {
			var playerSymbol = getPlayerSymbol(cells[row][col]); 
			$('#message').text("Player " + playerSymbol + " won!");
			if (playerSymbol === "X") {
				$('#message').css('color', 'green');
			} else {
				$('#message').css('color', 'red');
			}
			$("div .cell").off('click');
			return;
		}

		// check draw
		outerLoop: 
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				if (undefined == cells[i][j]) {
					allDefined = false;
					break outerLoop;
				}
			}
		}
		if (allDefined) {
			$('#message').text("Draw");
			$('#message').css('color', 'gray');
			$("div .cell").off('click');
			return;
		}
	}
});
