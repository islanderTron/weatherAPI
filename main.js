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

    // Need to do some of testing with different location and check with this data structure
    let data = JSON.parse(this.responseText);
    let address = data.results[0];
    let currentCity = address.address_components[3].long_name;
    let currentState = address.address_components[5].short_name;
    encodeGeoLocation(currentCity, currentState);
  });
};

function encodeGeoLocation(city, state) {
  let forecastURL = "http://api.wunderground.com/api/122e30171af0a6c6/forecast/q/" + state + "/" + city +".json";

  let currentForecast = "http://api.wunderground.com/api/122e30171af0a6c6/conditions/q/" + state + "/" + city + ".json"; 

  requestURL(currentForecast, function() {
    let data = JSON.parse(this.response);
    let current_observe = data.current_observation;
    layoutCurrentObserve(current_observe.display_location.city, current_observe.display_location.state, current_observe.icon_url, current_observe.temperature_string);
  });

  requestURL(forecastURL, function() {
    let data = JSON.parse(this.responseText);
    let forecast = data.forecast;
    forecast.simpleforecast.forecastday.forEach(element => {
      layoutForecast(element.icon_url, element.high.fahrenheit, element.high.celsius);
    });
  });
};

function layoutForecast(_img, fahrenheit, celsius) {
  // set up a group for each day
  let forecast_wrapper = document.createElement('div');
  forecast_wrapper.setAttribute('class', 'forecast_wrapper');
  
  // set up img div 
  let img_url = document.createElement('img');
  img_url.setAttribute('src', _img);

  // set up a F degree | C degrees
  let temp = document.createElement('div');
  temp.setAttribute('class', 'temp');

  let _f = document.createElement('span')
  _f.setAttribute('class', 'fahrenheit');
  _f.textContent = fahrenheit + " F\u00B0/";

  let _c = document.createElement('span');
  _c.setAttribute('class', 'celsius');
  _c.textContent = celsius + " C\u00B0";

  temp.appendChild(_f);
  temp.appendChild(_c);

  forecast_wrapper.appendChild(img_url);
  forecast_wrapper.appendChild(temp);
  document.getElementsByClassName('forecast')[0].appendChild(forecast_wrapper);
}

function layoutCurrentObserve(city, state, image, temp) {
  let currentLocation = document.createElement("h2");
  currentLocation.setAttribute('id', 'currentLocation');
  currentLocation.textContent = city + " " + state;

  let img_url = document.createElement('img');
  img_url.setAttribute('src', image);

  let currentTemp = document.createElement("p");
  currentTemp.setAttribute("id","currentTemp");
  currentTemp.textContent = temp;

  let currentClass = document.getElementsByClassName('current')[0];
  currentClass.appendChild(currentLocation);
  currentClass.appendChild(img_url);
  currentClass.appendChild(currentTemp);
}