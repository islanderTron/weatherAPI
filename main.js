function getLocation(latitude,longitude){
  var request = new XMLHttpRequest();

  var method = 'GET';
  var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude +"&key=AIzaSyAYSzN7cCjKN9WE5YqrYyv-ckUv-l-D95k";
  var async = true;

  request.open(method, url, async);
  request.onreadystatechange = function(){
    if(request.readyState == 4 && request.status == 200){
      var data = JSON.parse(request.responseText);
      console.log(data);
      var address = data.results[5];

      // Set a current for state (2 letters) & city and pass it to functions at below.
      var currentCity = address.address_components[1].long_name;
      var currentState = address.address_components[2].short_name;
      currentForeCast(currentCity, currentState);
      console.log(currentCity + "," + currentState);
    }
  };
  request.send();
};

var successCallback = function(position){
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  getLocation(lat,lng);
};

navigator.geolocation.getCurrentPosition(successCallback);

// Need to set up abstract json request function for variety functionality for weather.  
function currentForecast(city, state) {
  let method = "GET", async = true, url = "http://api.wunderground.com/api/122e30171af0a6c6/forecast/q/" + state + "/" + city +".json";
  request.open(method, url, async);
  request.onreadystatechange = function() {
    if(request.readyState == 4 && request.status == 200) {

    }
  }
}