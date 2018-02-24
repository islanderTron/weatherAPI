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
    currentForecast(currentCity, currentState);
  });
};

function currentForecast(city, state) {
  let url = "http://api.wunderground.com/api/122e30171af0a6c6/forecast/q/" + state + "/" + city +".json";
  requestURL(url, function() {
    let data = JSON.parse(this.responseText);
    let forecast = data.forecast;
    console.log(data);
    forecast.simpleforecast.forecastday.forEach(element => {
      // let div_icon = document.createElement("div");
      // div_icon.setAttribute("class", "icon");



      // let img_url = element.icon_url;
      // layout(element.icon_url);
      layout(element.icon_url, element.high.fahrenheit, element.high.celsius);
      // let imgEle = document.createElement("img");
      // imgEle.setAttribute("src", img_url);
      // document.querySelector(".icon").appendChild(imgEle);

      // document.querySelector(".content").appendChild(div_icon);
    });
  });
};

function layout(_img, fahrenheit, celsius) {
  // console.log(_img);
  // set up a group for each day
  let forecast_wrapper = document.createElement('div');
  forecast_wrapper.setAttribute('class', 'forecast_wrapper');
  
  // set up img div 
  let img_url = document.createElement('img');
  img_url.setAttribute('src', _img);

  // set up a F degree | C degrees
  let temp = document.createElement('div');
  temp.setAttribute('class', 'temp');

  let _f = document.createElement('p')
  _f.setAttribute('class', 'fahrenheit');
  _f.textContent = fahrenheit + " F";

  let _c = document.createElement('p');
  _c.setAttribute('class', 'celsius')
  _c.textContent = celsius + " C";

  temp.appendChild(_f);
  temp.appendChild(_c);

  forecast_wrapper.appendChild(img_url);
  forecast_wrapper.appendChild(temp);
  document.getElementById('content').appendChild(forecast_wrapper);
}