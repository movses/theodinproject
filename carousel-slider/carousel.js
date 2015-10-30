var images =  ["1.jpg", "2.jpg","3.jpg","4.jpg","5.jpg","6.jpg"];

function setImage(image) {
	var slider = document.getElementById("slider");
	var imagePath = "images" + "/" + image;
	while (slider.firstChild) {
	    slider.removeChild(slider.firstChild);
	}
	var img = document.createElement("img");
	img.className = "image";
	img.src = imagePath;
	slider.appendChild(img);
}

function slideshow() {
	var i = 0;
	window.setInterval(function() {				
		if (i === images.length) {
			i = 0;
		} 
		setImage(images[i]);
		i++;
	}, 2000);
}

window.onload = slideshow;
