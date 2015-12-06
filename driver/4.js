function render() {
	var data = [15,70,20,30,55];
	canvas = document.getElementById('canvas');
	var c = canvas.getContext('2d');
	c.fillStyle = "gray"; 
	c.fillRect(0,0,500,500);	
	c.fillStyle = "blue";
	for(var i = 0; i < data.length; i++) { 
		c.fillRect(10 + i*50, 150 - data[i], 40, data[i]); 
	} 
}

window.onload = render;
