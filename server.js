var express = require('express');
var app = express();
var bodyparser = require('body-parser');

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function () {
    var host = process.env.host;
    var port = app.get('port');
    console.log("Listening at http://%s:%s", host, port)
});
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.text());

process.on('uncaughtException', function (error) {
    console.log("uncaughtException :" + error);
});

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);

var routes = require('./routes');
app.post('/listStatistics', routes.listStatistics);
app.post('/registerStatistic', routes.registerStatistic);