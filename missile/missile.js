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
var enemyMissiles = [];
var playerMissiles = [];
var blowMissiles = [];
var houses = [true,true,true,true,true,true];
var score = 0;
var runAnimation = true;

function Missile(startX, startY, endX, endY, color) {
		this.startX = startX;
		this.startY = startY;
		this.endX = endX;
		this.endY = endY;
		this.color = color;
		this.x = startX;
		this.y = startY;
}

Missile.prototype.blow = function(endX, endY) {
    var missileBlow = new Blow(endX, endY);
    blowMissiles.push(missileBlow);
}

function Blow(endX, endY) {
    this.blowX = endX;
    this.blowY = endY;
    this.currentRadius = 0;
    this.blowRadius = 25;
}

function render() {
	canvas = document.getElementById('canvas');
	canvas.addEventListener('click', createPlayerMissile);

    setInterval( function() {
        if (enemyMissiles.length < 6) {
            createEnemyMissiles();
        }
    }, 1000);

    context = canvas.getContext('2d');

    loop();
}

function loop() {
    if(runAnimation){
        window.requestAnimFrame(loop);
        draw();
        update();
    }
}

function draw() {
	context.clearRect(0, 0, canvasSettings.width, canvasSettings.height);
    drawGround();
    drawStrikes();
    drawVillages();
    drawScore();
    drawEnemyMissiles();
    drawPlayerMissiles();
    drawBlows();
}

function drawPlayerMissiles() {
    playerMissiles.forEach( function(missile) {
        context.beginPath();
        context.moveTo(missile.startX, missile.startY);
        context.lineTo(missile.x, missile.y);
        context.closePath();
        context.strokeStyle = missile.color;
        context.stroke();
    });
}

function drawEnemyMissiles() {
    enemyMissiles.forEach( function(missile) {
        context.beginPath();
        context.moveTo(missile.startX, missile.startY);
        context.lineTo(missile.x, missile.y);
        context.closePath();
        context.strokeStyle = missile.color;
        context.stroke();
    });
}

function drawBlows() {
    blowMissiles.forEach( function(blow) {
        context.beginPath();
        context.arc(blow.blowX, blow.blowY, blow.currentRadius, 0, 2 * Math.PI);
        context.closePath();
        context.fillStyle = 'white';
        context.fill();
    });
}

function update() {
	updateEnemyMissile();
	updatePlayerMissile();
	updateBlow();
	check();
}

function check() {
    if (!isGameOver()) {
        checkPlayerMissile();
        checkEnemyMissile();
        checkBlow();
    } else {
        canvas.removeEventListener('click', createPlayerMissile);
        runAnimation = false;
        context.fillStyle = "red";
        context.font = "italic 60pt Arial";
        context.fillText("Game Over", canvasSettings.width / 4 , canvasSettings.height / 4);

        context.fillStyle = "yellow";
        context.font = "italic 60pt Arial";
        context.fillText("Score " + score, canvasSettings.width / 3 , canvasSettings.height / 2);
    }
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
    if(houses[0]) {
        context.fillRect(strikeMargin + strikeWidth + houseMargin + 0*houseWidth + 0*houseDistance,
            canvasHeight - groundHeight - houseHeight,
            houseWidth,
            houseHeight);
    }

    if(houses[1]) {
        context.fillRect(strikeMargin + strikeWidth + houseMargin + 1*houseWidth + 1*houseDistance,
            canvasHeight - groundHeight - houseHeight,
            houseWidth,
            houseHeight);
    }

    if(houses[2]) {
        context.fillRect(strikeMargin + strikeWidth + houseMargin + 2*houseWidth + 2*houseDistance,
            canvasHeight - groundHeight - houseHeight,
            houseWidth,
            houseHeight);
    }

    if(houses[3]) {
        context.fillRect(strikeMargin + 2*strikeWidth + 1*strikeDistance + houseMargin + 0*houseWidth + 0*houseDistance,
            canvasHeight - groundHeight - houseHeight,
            houseWidth,
            houseHeight);
    }

    if(houses[4]) {
        context.fillRect(strikeMargin + 2*strikeWidth + 1*strikeDistance + houseMargin + 1*houseWidth + 1*houseDistance,
            canvasHeight - groundHeight - houseHeight,
            houseWidth,
            houseHeight);
    }

    if(houses[5]) {
        context.fillRect(strikeMargin + 2*strikeWidth + 1*strikeDistance + houseMargin + 2*houseWidth + 2*houseDistance,
            canvasHeight - groundHeight - houseHeight,
            houseWidth,
            houseHeight);
    }
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
    context.fillStyle = "yellow";
    context.font = "italic 20pt Arial ";
    context.fillText("Score " + score, 10, 30);
}

window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame   ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function (callback){
				 window.setTimeout(callback, 1000 / 60);
			}; 
		})();

function createPlayerMissile() {
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

function updatePlayerMissile() {
	playerMissiles.forEach( function(missile) {
        var dy = 200 / 60;
		missile.y -= dy;
		var ang = Math.tan((missile.endX - missile.startX) /  (missile.startY - missile.endY));
		missile.x = (missile.startY - missile.y) * ang + missile.startX;
	});
}

function checkPlayerMissile() {
	for (var i = playerMissiles.length - 1; i >= 0; i--)  {	
		if (playerMissiles[i].y < playerMissiles[i].endY ) {
            playerMissiles[i].blow(playerMissiles[i].x, playerMissiles[i].y);
			playerMissiles.splice(i,1);
		}
	}
}

function updateEnemyMissile() {
    var dy = 40 / 60;
    enemyMissiles.forEach( function(missile) {
		missile.y += dy;
		var ang = Math.tan((missile.endX - missile.startX) /  (missile.endY - missile.startY));
		missile.x = (missile.y - missile.startY) * ang + missile.startX;
	});
}

function createEnemyMissiles() {
	var startX = Math.random() * canvasSettings.width;
	var startY = 0;
	var endX = Math.random() * canvasSettings.width;
	var endY =  canvasSettings.height - canvasSettings.groundHeight;
	var color = "red";
	var missile = new Missile(startX, startY, endX, endY, color);
	enemyMissiles.push(missile);
}


function checkEnemyMissile() {
	for (var i = enemyMissiles.length - 1; i >= 0; i--)  {	
		if (enemyMissiles[i].y >= enemyMissiles[i].endY) {
            checkHouseHit(enemyMissiles[i].endX);
            enemyMissiles[i].blow(enemyMissiles[i].x, enemyMissiles[i].y);
			enemyMissiles.splice(i,1);				
		}
	}
}

function checkHouseHit(x) {
    var strikeMargin = canvasSettings.strikeSettings.strikeMargin;
    var strikeWidth = canvasSettings.strikeSettings.strikeWidth;
    var strikeDistance = canvasSettings.strikeSettings.strikeDistance;
    var houseDistance = canvasSettings.houseSettings.houseDistance;
    var houseMargin = canvasSettings.houseSettings.houseMargin;
    var houseWidth = canvasSettings.houseSettings.houseWidth;

    if (x > (strikeMargin + 1*strikeWidth + houseMargin + 0*houseWidth + 0*houseDistance) &&
        x < (strikeMargin + 1*strikeWidth + houseMargin + 0*houseWidth + 0*houseDistance + houseWidth)) {
        houses[0] = false;
    }
    if (x > (strikeMargin + 1*strikeWidth + houseMargin + 1*houseWidth + 1*houseDistance) &&
        x < (strikeMargin + 1*strikeWidth + houseMargin + 1*houseWidth + 1*houseDistance + houseWidth)) {
        houses[1] = false;
    }
    if (x > (strikeMargin + 1*strikeWidth + houseMargin + 2*houseWidth + 2*houseDistance) &&
        x < (strikeMargin + 1*strikeWidth + houseMargin + + 2*houseWidth + 2*houseDistance + houseWidth)) {
        houses[2] = false;
    }
    if (x > (strikeMargin + 2*strikeWidth + 1*strikeDistance + houseMargin + 0*houseWidth + 0*houseDistance) &&
        x < (strikeMargin + 2*strikeWidth + 1*strikeDistance + houseMargin + 0*houseWidth + 0*houseDistance + houseWidth)) {
        houses[3] = false;
    }
    if (x > (strikeMargin + 2*strikeWidth + 1*strikeDistance + houseMargin + 1*houseWidth + 1*houseDistance) &&
        x < (strikeMargin + 2*strikeWidth + 1*strikeDistance + houseMargin + 1*houseWidth + 1*houseDistance + houseWidth)) {
        houses[4] = false;
    }
    if (x > (strikeMargin + 2*strikeWidth + 1*strikeDistance + houseMargin + 2*houseWidth + 2*houseDistance) &&
        x < (strikeMargin + 2*strikeWidth + 1*strikeDistance + houseMargin + 2*houseWidth + 2*houseDistance + houseWidth)) {
        houses[5] = false;
    }
}

function isGameOver() {
    var gameOver = true;
    for (var i = 0; i < houses.length; ++i) {
        if (houses[i] === true) {
            gameOver = false;
            break;
        }
    }
    return gameOver;
}


function checkEnemyMissileHit(x, y, r) {
    /*
    * to check point belongs to circle
    * it must satisfy the following formula
    * (x-x0)^2 + (y-y0)^2 < r^2
    * */
    for (var i = enemyMissiles.length - 1; i >= 0; i--)  {
        if((Math.pow((x - enemyMissiles[i].x), 2) + Math.pow((y - enemyMissiles[i].y), 2)) < Math.pow(r, 2)) {
            score++;
            enemyMissiles.splice(i,1);
        }
    }
}

function updateBlow() {
    blowMissiles.forEach( function(blow) {
        var dr = blow.blowRadius / (2 * 60);
        blow.currentRadius += dr;
        checkEnemyMissileHit(blow.blowX, blow.blowY, blow.currentRadius);
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
