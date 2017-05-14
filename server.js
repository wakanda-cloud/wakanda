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

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function () {
    var host = process.env.host;
    var port = app.get('port');
    console.log("Listening at http://%s:%s", host, port)
});