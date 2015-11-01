var images =  ["1.jpg", "2.jpg","3.jpg","4.jpg","5.jpg","6.jpg"];

function setImage(image) {
	var slider = document.getElementById("slider");
	var imagePath = "images" + "/" + image;
	var images = document.getElementsByClassName("image");
	while (slider.firstChild) {
	    slider.removeChild(slider.firstChild);
	}
	var img = document.createElement("img");
	img.className = "image";
	img.src = imagePath;
	slider.appendChild(img);
}

function drawSlider() {
	drawCircles();
	slideShow();
}


function markCircle(index) {
	var items = document.getElementsByClassName("item");
      //var backgroundColor = getComputedStyle(items[index]).getPropertyValue("background-color");
	var backgroundColor = items[index].style.backgroundColor;
	for (var i = 0; i < items.length; i++) {
		if (i !== index) {
			items[i].style.backgroundColor = backgroundColor;
		} else {
			items[i].style.backgroundColor =  "green";
		}
	}
}

function slideShow() {
	var i = 0;
	window.setInterval(function() {				
		if (i === images.length) {
			i = 0;
		} 
		setImage(images[i]);
		markCircle(i);
		i++;
	}, 5000);
}

function drawCircles() {
	var circle = document.getElementById("circle");
	while (circle.firstChild) {
	    circle.removeChild(circle.firstChild);
	}
	for (var i = 0; i < images.length; i++) {
		var div = document.createElement("div");
		div.className = "item";
		circle.appendChild(div);
	}
}

function gotoSlide(event) {
	alert(event);
}

//document.getElementById('circle').onClick = gotoSlide;
window.onload = drawSlider;
