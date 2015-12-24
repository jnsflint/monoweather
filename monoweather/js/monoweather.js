
function weatherIdToIconClassMapper(weatherId) {
  var iconClassMap = {
    0: "unknown",
    // Group 2xx: Thunderstorm 
    200: "thunderstorms",
    201: "thunderstorms",
    202: "thunderstorms",
    210: "scattered-thunderstorms",
    211: "thunderstorms",
    212: "thunderstorms",
    221: "thunderstorms",
    230: "thunderstorms",
    231: "thunderstorms",
    232: "thunderstorms",
    // Group 3xx: Drizzle
    300: "rain",
    301: "rain",
    310: "rain",
    302: "rain",
    311: "rain",
    312: "rain",
    313: "rain",
    314: "rain",
    321: "rain",
    // Group 5xx: Rain
    500: "rain",
    501: "rain",
    502: "rain",
    503: "rain",
    504: "rain",
    511: "freezing-rain",
    520: "showers",
    521: "showers",
    522: "showers",
    531: "rain",
    // Group 6xx: Snow
    600: "snow",
    601: "snow",
    602: "snow",
    611: "snow",
    612: "snow",
    615: "snow-rain",
    616: "snow-rain",
    620: "snow",
    621: "snow",
    622: "snow",
    // Group 7xx: Atmosphere
    701: "mist",
    711: "smoke",
    721: "",
    731: "dust",
    741: "fog",
    751: "dust",
    761: "dust",
    762: "",
    771: "",
    781: "",
    // Group 800: Clear
    800: "fair",
    // Group 80x: Clouds
    801: "few-clouds",
    802: "partly-cloudy",
    803: "mostly-cloudy",
    804: "overcast",
    // Group 90x: Extreme
    900: "storm",
    901: "storm",
    902: "storm",
    903: "",
    904: "",
    905: "wind",
    906: "sleet",
    // Group 9xx: Additional
    951: "",
    952: "",
    953: "",
    954: "",
    955: "",
    956: "",
    957: "",
    958: "",
    959: "",
    960: "storm",
    961: "storm",
    962: "storm"
  };  
  
  var iconClass = iconClassMap[weatherId];
  
  if (iconClass === undefined || iconClass === "") {
  	iconClass = iconClassMap[0];
  }
  console.log(weatherId);
  console.log(iconClass);
  return iconClass;
}


function getWeatherData(callback) {
  var url = "http://api.openweathermap.org/data/2.5/forecast?q=Rostock,de&APPID=5c89c7245caaa3596502a74a2bb95430&units=metric&lang=de";
  var weatherData = {};
  
  $.getJSON( url, function( data ) {
    weatherData = data;
    callback(weatherData);
  });
}

function setWeatherInfo(nmbr, timeStr, tempLowStr, tempHighStr, iconClass) {
  var nmbrToElemId = {
    0: "#weather-current",
    1: "#weather-forecast-hour-1",
    2: "#weather-forecast-hour-2",
    3: "#weather-forecast-hour-3"
  }
  
  var elem = $(nmbrToElemId[nmbr]);
  elem.find(".caption").text(timeStr);
  elem.find(".temp-low .value").text(tempLowStr);
  elem.find(".temp-high .value").text(tempHighStr);
  elem.find(".weather-icon").attr("data-icon",iconClass);
}


function onWeatherDataLoaded(weatherData) {
  var iterations = 0;
  for (idx in weatherData.list) {
    
    // get item
    var item = weatherData.list[idx];
    
    // format timestamp
    var dt = new Date(item.dt * 1000);
    var dtStr = dt.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
    
    // format temparture
    var tempLow = Math.round(item.main.temp_min).toString();
    var tempHigh = Math.round(item.main.temp_max).toString();
    
    // lookup icon class name
    var weatherId = item.weather && item.weather.length > 0 ? item.weather[0].id : -1;
    var iconClass = weatherIdToIconClassMapper(weatherId);
    
    // set the weather info
    setWeatherInfo(iterations, dtStr, tempLow, tempHigh, iconClass);
    
    iterations++;
    if (iterations >= 4) {break}
  }
  var codeTag = $("<code/>").text(JSON.stringify(weatherData, null, 4));
  var preTag = $("<pre>").append(codeTag);
  preTag.insertBefore($("footer"));
}

function onLoad( jQuery ) {
  
  getWeatherData(onWeatherDataLoaded);

	var tempIntervalId = -1;
	var temp = 30;
	function myCallback() {
		//$("#weather-current .temp-high .value").text(temp++);
		if (temp > 40 && tempIntervalId > 0) {
			clearInterval(tempIntervalId);
		}
	}
	
	tempIntervalId = window.setInterval(myCallback, 1500);
}
 
$( document ).ready( onLoad );