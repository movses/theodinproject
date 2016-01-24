var _canvas = {
	height : 600,
	width : 800,
	settings : {
		groundHeight : 50,
		strikeDistance : 180,
		strikeMargin : 100,
		strikeHeight : 25,
		strikeWidth : 80,
		houseDistance : 15,
		houseMargin : 15,
		houseWidth : 40,
		houseHeight : 10,
		blowRadius : 25
	}
};

var canvas;
var c;

function Missile(startX, startY, endX, endY, color) {
		this.startX = startX;
		this.startY = startY;
		this.endX = endX;
		this.endY = endY;
		this.color = color;
		this.x = startX;
		this.y = startY;
}


function render() {

	var canvasHeight = 600;
	var canvasWidth = 800;
	var groundHeight = 50;

	canvas = document.getElementById('canvas');

	canvas.addEventListener('click', function(event) {
		createPlayerMissile(canvas, event);
	});

	c = canvas.getContext('2d');
	c.fillStyle = "black"; 
	c.fillRect(0, 0, canvasWidth, canvasHeight);	
	c.fillStyle = "yellow";
	c.fillRect(0, canvasHeight - groundHeight, canvasWidth, groundHeight);
	
	var strikeMargin = 100;
	var strikeWidth = 80;
	var strikeHeight = 25;
	 
	var strikeDistance = 180;

	c.fillStyle = "blue";
	c.beginPath();
	c.moveTo(strikeMargin, canvasHeight - groundHeight);
	c.lineTo(strikeMargin + 20, canvasHeight - groundHeight - strikeHeight);
	c.lineTo(strikeMargin + 20 + 40, canvasHeight - groundHeight - strikeHeight);
	c.lineTo(strikeMargin + 20 + 40 + 20, canvasHeight - groundHeight);
	c.closePath();
	c.fill();
	
	
	c.beginPath();
	c.moveTo(strikeMargin + 1*strikeWidth + 1*strikeDistance, canvasHeight - groundHeight);
	c.lineTo(strikeMargin + 1*strikeWidth + 1*strikeDistance + 20, canvasHeight - groundHeight - strikeHeight);
	c.lineTo(strikeMargin + 1*strikeWidth + 1*strikeDistance + 20 + 40, canvasHeight - groundHeight - strikeHeight);
	c.lineTo(strikeMargin + 1*strikeWidth + 1*strikeDistance + 20 + 40 + 20, canvasHeight - groundHeight);
	c.closePath();
	c.fill();


	c.beginPath();
	c.moveTo(strikeMargin + 2*strikeWidth + 2*strikeDistance, canvasHeight - groundHeight);
	c.lineTo(strikeMargin + 2*strikeWidth + 2*strikeDistance + 20, canvasHeight - groundHeight - strikeHeight);
	c.lineTo(strikeMargin + 2*strikeWidth + 2*strikeDistance + 20 + 40, canvasHeight - groundHeight - strikeHeight);
	c.lineTo(strikeMargin + 2*strikeWidth + 2*strikeDistance + 20 + 40 + 20, canvasHeight - groundHeight);
	c.closePath();
	c.fill();

	var houseDistance = 15;
	var houseMargin = 15;
	var houseWidth = 40;
	var houseHeight = 10;

	c.fillStyle = "brown";
	c.fillRect(strikeMargin + strikeWidth + houseMargin + 0*houseWidth + 0*houseDistance, 
					canvasHeight - groundHeight - houseHeight, 
					houseWidth, 
					houseHeight);
	c.fillRect(strikeMargin + strikeWidth + houseMargin + 1*houseWidth + 1*houseDistance, 
					canvasHeight - groundHeight - houseHeight, 
					houseWidth, 
					houseHeight);
	c.fillRect(strikeMargin + strikeWidth + houseMargin + 2*houseWidth + 2*houseDistance, 
					canvasHeight - groundHeight - houseHeight, 
					houseWidth, 
					houseHeight);

	
	c.fillRect(strikeMargin + 2*strikeWidth + 1*strikeDistance + houseMargin + 0*houseWidth + 0*houseDistance,
					 canvasHeight - groundHeight - houseHeight, 
					 houseWidth, 
					 houseHeight);

	c.fillRect(strikeMargin + 2*strikeWidth + 1*strikeDistance + houseMargin + 1*houseWidth + 1*houseDistance, 
					 canvasHeight - groundHeight - houseHeight,
					 houseWidth,
					 houseHeight);

	c.fillRect(strikeMargin + 2*strikeWidth + 1*strikeDistance + houseMargin + 2*houseWidth + 2*houseDistance,
					 canvasHeight - groundHeight - houseHeight,
					 houseWidth,
					 houseHeight);

	enemyBusyLoop();
	playerBusyLoop();
}

var radius, endX, endY;
var enemyAnimReqId, playerAnimReqId, blowAnimReqId;
var enemyMissiles = [];
var playerMissiles = [];

window.requestAnimFrame = (function(){   
		return  window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function (callback){
				 window.setTimeout(callback, 1000 / 60);
			}; 
		})();

function createPlayerMissile(canvas, event) {
	var rect = canvas.getBoundingClientRect();

	var endX = event.clientX - rect.left;   
	var endY = event.clientY - rect.top;
	
	var startY = _canvas.height - _canvas.settings.groundHeight - _canvas.settings.strikeHeight;

	if (endX < _canvas.settings.strikeMargin + _canvas.settings.strikeWidth + 0.5 * _canvas.settings.strikeDistance) {
		startX = strikeMargin + 0.5 * strikeWidth;
	} else if (endX > _canvas.settings.strikeMargin + 2 * _canvas.settings.strikeWidth + 1.5 * _canvas.settings.strikeDistance)  {
		startX = _canvas.settings.strikeMargin + 2.5 * _canvas.settings.strikeWidth + 2 * _canvas.settings.strikeDistance;
	} else {
		startX = _canvas.settings.strikeMargin + 1.5 * _canvas.settings.strikeWidth + _canvas.settings.strikeDistance;
	}

	var color = "blue";
	var missile = new Missile(startX, startY, endX, endY, color);
	playerMissiles.push(missile);

}


function playerBusyLoop() {
	playerAnimReqId = window.requestAnimFrame(playerBusyLoop);
	updatePlayerMissile();
	checkPlayerMissile();	
}

function updatePlayerMissile() {
	playerMissiles.forEach( function(missile) {
		missile.y -= 5;
		var ang = Math.tan((missile.endX - missile.startX) /  (missile.startY - missile.endY));
		missile.x = (missile.startY - missile.y) * ang + missile.startX;
		
		if (missile.y > missile.endY) {
			c.beginPath();
			c.moveTo(missile.startX, missile.startY);
			c.lineTo(missile.x, missile.y);
			c.closePath();
			c.strokeStyle = 'blue';
			c.stroke();
		} else {
			c.beginPath();
			c.moveTo(missile.startX, missile.startY);
			c.lineTo(missile.x, missile.y);
			c.closePath();
			c.strokeStyle = 'black';
			c.stroke();
			window.cancelAnimationFrame(playerAnimReqId);
		}
	});
}

function checkPlayerMissile() {
	for (var i = playerMissiles.length - 1; i >= 0; i--)  {	
		if (playerMissiles[i].y < playerMissiles[i].endY ) {
			endX = playerMissiles[i].x;
			endY = playerMissiles[i].y;
			radius = 0;
			animateBlow();
			playerMissiles.splice(i,1);				
		}
	}
}

function enemyBusyLoop() {
	setTimeout( function() {
		enemyAnimReqId = window.requestAnimFrame(enemyBusyLoop);
		createEnemyMissile();
		updateEnemyMissile();
		checkEnemyMissile();
	}, 1000 / 2);
}

function createEnemyMissile() {
	if (enemyMissiles.length < 10) {
		var startX = Math.random() * _canvas.width;
		var startY = 0;
		var endX = Math.random() * _canvas.width;
		var endY =  _canvas.height - _canvas.settings.groundHeight;
		var color = "red";
		var missile = new Missile(startX, startY, endX, endY, color);
		enemyMissiles.push(missile);
	}
}

function updateEnemyMissile() {
	enemyMissiles.forEach( function(missile) {
		missile.y = missile.y + 5;
		var ang = Math.tan((missile.endX - missile.startX) /  (missile.endY - missile.startY));
		missile.x = (missile.y - missile.startY) * ang + missile.startX;
		
		if (missile.y < missile.endY) {
			c.beginPath();
			c.moveTo(missile.startX, missile.startY);
			c.lineTo(missile.x, missile.y);
			c.closePath();
			c.strokeStyle = 'red';
			c.stroke();
		} else {
			c.beginPath();
			c.moveTo(missile.startX, missile.startY);
			c.lineTo(missile.x, missile.y);
			c.closePath();
			c.strokeStyle = 'black';
			c.stroke();
			window.cancelAnimationFrame(enemyAnimReqId);
		}
	});
}

function checkEnemyMissile() {
	for (var i = enemyMissiles.length - 1; i >= 0; i--)  {	
		if (enemyMissiles[i].y >= enemyMissiles[i].endY) {
			endX = enemyMissiles[i].x;
			endY = enemyMissiles[i].y;
			radius = 0;
			animateBlow();
			enemyMissiles.splice(i,1);				
		}
	}
}

function animateBlow() {
		blowAnimReqId = window.requestAnimFrame(animateBlow);
		if (radius < _canvas.settings.blowRadius) {
			c.beginPath();
			c.arc(endX, endY, radius, 0, 2*Math.PI);
			c.closePath();
			c.fillStyle = 'white';
			c.fill();
		} else {
			c.beginPath()
			c.arc(endX, endY, radius, 0, 2*Math.PI);
			c.closePath();
			c.fillStyle = 'black';
			c.fill();
			window.cancelAnimationFrame(blowAnimReqId);
		}
		radius += 1; 
}

window.onload = render;
