function getLocation(latitude,longitude){
  var request = new XMLHttpRequest();

  var method = 'GET';
  var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true';
  var async = true;

  request.open(method, url, async);
  request.onreadystatechange = function(){
    if(request.readyState == 4 && request.status == 200){
      var data = JSON.parse(request.responseText);
      var address = data.results[2];
      document.write(address.formatted_address);
      console.log(address);
    }
  };
  request.send();
};

var successCallback = function(position){
  var x = position.coords.latitude;
  var y = position.coords.longitude;
  getLocation(lat,lng);
};

navigator.geolocation.getCurrentPosition(successCallback);