var canvasSettings = {
	height : 600,
	width : 800,
	houseSettings : {
		houseDistance : 15,
		houseMargin : 15,
		houseWidth : 40,
		houseHeight : 10
	},
	strikeSettings : {
		strikeDistance : 180,
		strikeMargin : 100,
		strikeHeight : 25,
		strikeWidth : 80
	},
	groundHeight : 50
};

var canvas;
var context;
var endX, endY;
var enemyMissiles = [];
var playerMissiles = [];
var blowMissiles = [];

function Missile(startX, startY, endX, endY, color) {
		this.startX = startX;
		this.startY = startY;
		this.endX = endX;
		this.endY = endY;
		this.color = color;
		this.x = startX;
		this.y = startY;
}

Missile.prototype.blow = function() {
    var missileBlow = new Blow();
    blowMissiles.push(missileBlow);
}

function Blow() {
    this.currentRadius = 0;
    this.blowRadius = 25;
}



function render() {

	canvas = document.getElementById('canvas');

	canvas.addEventListener('click', function(event) {
		createPlayerMissile(canvas, event);
	});

    context = canvas.getContext('2d');

    draw();
    enemyBusyLoop();
    playerBusyLoop();

}

function draw() {
//    setTimeout( function() {
        window.requestAnimFrame(draw);
        context.clearRect(0, 0, canvasSettings.width, canvasSettings.height);
        drawGround();
        drawStrikes();
        drawVillages();
        drawScore();
//    }, 2000 );
}

function drawVillages() {

	var houseDistance = canvasSettings.houseSettings.houseDistance;
	var houseMargin = canvasSettings.houseSettings.houseMargin;
	var houseWidth = canvasSettings.houseSettings.houseWidth;
	var houseHeight = canvasSettings.houseSettings.houseHeight;
    var strikeMargin = canvasSettings.strikeSettings.strikeMargin;
    var strikeWidth = canvasSettings.strikeSettings.strikeWidth;
    var strikeDistance = canvasSettings.strikeSettings.strikeDistance;
    var canvasHeight = canvasSettings.height;
    var groundHeight = canvasSettings.groundHeight;

	context.fillStyle = "brown";
	context.fillRect(strikeMargin + strikeWidth + houseMargin + 0*houseWidth + 0*houseDistance,
					canvasHeight - groundHeight - houseHeight, 
					houseWidth,
					houseHeight);
	context.fillRect(strikeMargin + strikeWidth + houseMargin + 1*houseWidth + 1*houseDistance,
					canvasHeight - groundHeight - houseHeight, 
					houseWidth, 
					houseHeight);
    context.fillRect(strikeMargin + strikeWidth + houseMargin + 2*houseWidth + 2*houseDistance,
					canvasHeight - groundHeight - houseHeight, 
					houseWidth, 
					houseHeight);


    context.fillRect(strikeMargin + 2*strikeWidth + 1*strikeDistance + houseMargin + 0*houseWidth + 0*houseDistance,
					 canvasHeight - groundHeight - houseHeight, 
					 houseWidth, 
					 houseHeight);

    context.fillRect(strikeMargin + 2*strikeWidth + 1*strikeDistance + houseMargin + 1*houseWidth + 1*houseDistance,
					 canvasHeight - groundHeight - houseHeight,
					 houseWidth,
					 houseHeight);

    context.fillRect(strikeMargin + 2*strikeWidth + 1*strikeDistance + houseMargin + 2*houseWidth + 2*houseDistance,
					 canvasHeight - groundHeight - houseHeight,
					 houseWidth,
					 houseHeight);
}

function drawStrikes() {
  
	var strikeMargin = canvasSettings.strikeSettings.strikeMargin;
	var strikeWidth = canvasSettings.strikeSettings.strikeWidth;
	var strikeHeight = canvasSettings.strikeSettings.strikeHeight;
	var strikeDistance = canvasSettings.strikeSettings.strikeDistance;
    var canvasHeight = canvasSettings.height;
    var groundHeight = canvasSettings.groundHeight;

	context.fillStyle = "blue";
    context.beginPath();
    context.moveTo(strikeMargin, canvasHeight - groundHeight);
    context.lineTo(strikeMargin + 20, canvasHeight - groundHeight - strikeHeight);
    context.lineTo(strikeMargin + 20 + 40, canvasHeight - groundHeight - strikeHeight);
    context.lineTo(strikeMargin + 20 + 40 + 20, canvasHeight - groundHeight);
    context.closePath();
    context.fill();
	
	
	context.beginPath();
	context.moveTo(strikeMargin + 1*strikeWidth + 1*strikeDistance, canvasHeight - groundHeight);
	context.lineTo(strikeMargin + 1*strikeWidth + 1*strikeDistance + 20, canvasHeight - groundHeight - strikeHeight);
	context.lineTo(strikeMargin + 1*strikeWidth + 1*strikeDistance + 20 + 40, canvasHeight - groundHeight - strikeHeight);
	context.lineTo(strikeMargin + 1*strikeWidth + 1*strikeDistance + 20 + 40 + 20, canvasHeight - groundHeight);
	context.closePath();
	context.fill();


	context.beginPath();
	context.moveTo(strikeMargin + 2*strikeWidth + 2*strikeDistance, canvasHeight - groundHeight);
	context.lineTo(strikeMargin + 2*strikeWidth + 2*strikeDistance + 20, canvasHeight - groundHeight - strikeHeight);
	context.lineTo(strikeMargin + 2*strikeWidth + 2*strikeDistance + 20 + 40, canvasHeight - groundHeight - strikeHeight);
	context.lineTo(strikeMargin + 2*strikeWidth + 2*strikeDistance + 20 + 40 + 20, canvasHeight - groundHeight);
	context.closePath();
	context.fill();
}

function drawGround() {
    var canvasHeight = canvasSettings.height;
    var canvasWidth = canvasSettings.width;
    var groundHeight = canvasSettings.groundHeight;

	context.fillStyle = "black";
	context.fillRect(0, 0, canvasWidth, canvasHeight);
	context.fillStyle = "yellow";
	context.fillRect(0, canvasHeight - groundHeight, canvasWidth, groundHeight);
}

function drawScore() {
  
}

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
	
	var startY = canvasSettings.height - canvasSettings.groundHeight - canvasSettings.strikeSettings.strikeHeight;
    var startX;

	if (endX < canvasSettings.strikeSettings.strikeMargin +
                canvasSettings.strikeSettings.strikeWidth +
                0.5 * canvasSettings.strikeSettings.strikeDistance) {
		startX = canvasSettings.strikeSettings.strikeMargin + 0.5 * canvasSettings.strikeSettings.strikeWidth;
	} else if (endX > canvasSettings.strikeSettings.strikeMargin +
                2 * canvasSettings.strikeSettings.strikeWidth +
                1.5 * canvasSettings.strikeSettings.strikeDistance)  {

		startX = canvasSettings.strikeSettings.strikeMargin +
            2.5 * canvasSettings.strikeSettings.strikeWidth +
            2 * canvasSettings.strikeSettings.strikeDistance;
	} else {
		startX = canvasSettings.strikeSettings.strikeMargin +
            1.5 * canvasSettings.strikeSettings.strikeWidth +
            canvasSettings.strikeSettings.strikeDistance;
	}

	var color = "blue";
	var missile = new Missile(startX, startY, endX, endY, color);
	playerMissiles.push(missile);

}


function playerBusyLoop() {
	window.requestAnimFrame(playerBusyLoop);
	updatePlayerMissile();
	checkPlayerMissile();
    updateBlow();
    checkBlow();
}

function updatePlayerMissile() {
	playerMissiles.forEach( function(missile) {
		missile.y -= 5;
		var ang = Math.tan((missile.endX - missile.startX) /  (missile.startY - missile.endY));
		missile.x = (missile.startY - missile.y) * ang + missile.startX;
		
		if (missile.y > missile.endY) {
			context.beginPath();
			context.moveTo(missile.startX, missile.startY);
			context.lineTo(missile.x, missile.y);
			context.closePath();
			context.strokeStyle = 'blue';
			context.stroke();
		}
	});
}

function checkPlayerMissile() {
	for (var i = playerMissiles.length - 1; i >= 0; i--)  {	
		if (playerMissiles[i].y < playerMissiles[i].endY ) {
			endX = playerMissiles[i].x;
			endY = playerMissiles[i].y;
            playerMissiles[i].blow();
			playerMissiles.splice(i,1);
		}
	}
}

function enemyBusyLoop() {
	setTimeout( function() {
        window.requestAnimFrame(enemyBusyLoop);
        createEnemyMissile();
		updateEnemyMissile();
		checkEnemyMissile();
        updateBlow();
        checkBlow();
	}, 1000 / 2);
}

function createEnemyMissile() {
	if (enemyMissiles.length < 10) {
		var startX = Math.random() * canvasSettings.width;
		var startY = 0;
		var endX = Math.random() * canvasSettings.width;
		var endY =  canvasSettings.height - canvasSettings.groundHeight;
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
			context.beginPath();
			context.moveTo(missile.startX, missile.startY);
			context.lineTo(missile.x, missile.y);
			context.closePath();
			context.strokeStyle = 'red';
			context.stroke();
		}
	});
}

function checkEnemyMissile() {
	for (var i = enemyMissiles.length - 1; i >= 0; i--)  {	
		if (enemyMissiles[i].y >= enemyMissiles[i].endY) {
			endX = enemyMissiles[i].x;
			endY = enemyMissiles[i].y;
            enemyMissiles[i].blow();
			enemyMissiles.splice(i,1);				
		}
	}
}

function updateBlow() {
    blowMissiles.forEach( function(blow) {
        if (blow.currentRadius < blow.blowRadius) {
            context.beginPath();
            context.arc(endX, endY, blow.currentRadius, 0, 2 * Math.PI);
            context.closePath();
            context.fillStyle = 'white';
            context.fill();
        }
        blow.currentRadius += 1;
    });
}

function checkBlow() {
    for (var i = blowMissiles.length - 1; i >= 0; i--)  {
        if (blowMissiles[i].currentRadius >= blowMissiles[i].blowRadius) {
            blowMissiles.splice(i,1);
        }
    }
}

window.onload = render;
