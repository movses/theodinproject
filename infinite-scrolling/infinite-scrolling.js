
$(document).ready(function () {

	var keywords = ["love", "boy", "girl", "nice"];
	i = 0;
	callServer(i);

	$(window).scroll(function() {
	   if($(window).scrollTop() + $(window).height() == $(document).height()) {
	       if (i < keywords.length) {
			i++;
			$("#container").append("<img id='load' src='img/loading.png'/>");
			setTimeout(function(){
				$("#load").remove();
			}, 1000);
			callServer(i);
		}
	   }	   
	});


	function callServer(index) { 

	    $.ajax({

	    // The URL for the request
	    url: "http://www.omdbapi.com/?s=" + keywords[index] + "&type=movie",
	 
	    // Whether this is a POST or GET request
	    type: "GET",
	 
	    // The type of data we expect back
	    dataType : "json",
	 
	    // Code to run if the request succeeds;
	    // the response is passed to the function
	    success: function(json) {
	      for (var i = 0; i < json.Search.length; i++) {
		var movie = json.Search[i];
		movieContent = $('<div></div>');
		movieContent
			.append('<h4>' + movie.Title + '</h4>')
			.append('<h5>' + movie.Year + '</h5>')
			.append('<p><strong>Imdb ID:</strong> ' + movie.imdbID + '</p>')
			.append('<br>')
			.append('<hr>');
		$("#container").append(movieContent);
	      }
	    },
	 
	    // Code to run if the request fails; the raw request and
	    // status codes are passed to the function
	    error: function(xhr, status, errorThrown) {
		alert("Sorry, there was a problem!");
		console.log("Error: " + errorThrown);
		console.log("Status: " + status);
		console.dir(xhr);
	    },
	 
	    // Code to run regardless of success or failure
	    complete: function( xhr, status ) {
		console.log( "The request is complete!" );
	    }
	});
	} 
});


