function initialize() {
  var myCenter=new google.maps.LatLng(40.1516606,44.8641464);
  var mapProp = {
    center:new google.maps.LatLng(40.1516606,44.8641464),
    zoom:9,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("map"),mapProp);

  var marker=new google.maps.Marker({
  	position:myCenter,
  	animation:google.maps.Animation.BOUNCE
  });

  marker.setMap(map);
}


google.maps.event.addDomListener(window, 'load', initialize);

