
var express = require('express');
var request = require("request");
var app = express();

app.set('views', './views');
app.set('view engine', 'jade');

var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};
app.use(requestTime);

app.get('/', function (req, res) {
  
  var url = "http://api.openweathermap.org/data/2.5/forecast?q=Rostock,de&APPID=a0279d18aaef44ecfa6b42384ed247f9&units=metric&lang=de";
  var weatherJson = {};
  request({
    url: url,
    json: true
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(body); // Print the json response
      weatherJson = body;
      res.render('index', { 
        title: 'Hey', 
        message: 'Hello there!',
        jsoncode: JSON.stringify(weatherJson, null, 4)
      });
    }
  });
  /*
  res.render('index', { 
    title: 'Hey', 
    message: 'Hello there!',
    jsoncode: JSON.stringify(weatherJson)
  });
  */
});

app.listen(3000);
