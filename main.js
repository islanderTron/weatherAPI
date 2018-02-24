function requestURL(url, callback) {
  let request = new XMLHttpRequest(), 
  method = 'GET', 
  async = true;

  request.open(method, url, async);
  request.onreadystatechange = function() {
    if(request.readyState == 4 && request.status == 200) {
      callback.apply(request);
    }
  };
  request.send();
};

let successCallback = function(position) {
  let lat = position.coords.latitude;
  let lng = position.coords.longitude;
  getLocation(lat,lng);
};

navigator.geolocation.getCurrentPosition(successCallback);

function getLocation(latitude,longitude) {
  let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude +"&key=AIzaSyAYSzN7cCjKN9WE5YqrYyv-ckUv-l-D95k";

  requestURL(url, function() {
    // Set a current for state (2 letters) & city and pass it to functions at below.
    let data = JSON.parse(this.responseText);
    let address = data.results[5];
    let currentCity = address.address_components[1].long_name;
    let currentState = address.address_components[2].short_name;
    // console.log(currentState);
    currentForecast(currentCity, currentState);
  });
};

function currentForecast(city, state) {
  let url = "http://api.wunderground.com/api/122e30171af0a6c6/forecast/q/" + state + "/" + city +".json";
  
  requestURL(url, function() {
    let data = JSON.parse(this.responseText);
    let forecast = data.forecast;
    console.log(data);
    console.log(forecast.txt_forecast.forecastday[0]);
    forecast.txt_forecast.forecastday.forEach(element => {
      console.log(element);
    });
  });
};