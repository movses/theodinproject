function render() {
	canvas = document.getElementById('canvas');
	var c = canvas.getContext('2d');
	c.fillStyle = '#ccddff';
	c.beginPath();
	c.moveTo(50,20);
	c.lineTo(200,50);
	c.lineTo(150,80);
	c.closePath();
	c.fill();
	c.strokeStyle = 'rgb(0,128,0)';
	c.lineWidth = 1;
	c.stroke()
}

window.onload = render;
