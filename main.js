// function httpGet(url){
//     var xmlhttp = new XMLHttpRequest();
//     xmlhttp.open("GET", url, false);
//     xmlhttp.send(null);
//     return xmlhttp.responseText;
// }

// function getCurrentLocation() {
//     // 
// }

// function CurrentForecast() {
    
// }

// httpGet("http://api.wunderground.com/api/122e30171af0a6c6/forecast10day/q/CA/San_Francisco.json");

class Weather {
    constructor(standard, data) {
        this.standard = standard;
    }

    get forecast() {
        return this.Currentforecast();
    }

    Currentforecast() {
        return  this.standard + "/" +    this.data;
    }
}

const test = new Weather("http://api.wunderground.com/api/122e30171af0a6c6", "/forecast10day/q/CA/San_Francisco.json");

console.log(test);