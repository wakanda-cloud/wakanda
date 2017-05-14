var config = require('./config/config');
var express = require('express');
var bodyparser = require('body-parser');
var app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

var routes = require('./routes');

process.on('uncaughtException', function (error) {
    console.log("uncaughtException :" + error);
});

app.get('/listStatistics', routes.listStatistics);
app.post('/registerStatistic', routes.registerStatistic);

var server = app.listen(config.port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Listening at http://%s:%s", host, port)

});