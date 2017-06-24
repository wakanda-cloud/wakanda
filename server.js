'use strict';

let express = require('express');
let app = express();
let ejs = require('ejs');

let bodyparser = require('body-parser');

app.set('port', (process.env.PORT || 7000));

app.listen(app.get('port'), function () {

    let port = app.get('port');
    console.log("Listening at port :%s", port)

    if(!process.env.DECRYPT_KEY) {
        process.env.DECRYPT_KEY = "qwertyui";
        throw "Decrypt key not configured";
    }
});


app.use(bodyparser.urlencoded({extended: false}));

app.use(bodyparser.text());
app.use(bodyparser.json());

process.on('uncaughtException', function (error) {
    console.log("uncaughtException :" + error);
});
var cors = require('cors');

app.use(cors());
var routes = require('./routes');
app.get('/listStatistics', routes.listStatisticsGet);
app.post('/listStatistics', routes.listStatisticsPost);
app.post('/registerStatistic', routes.registerStatistic);
app.get('/fetchDashboardData', routes.fetchDashboardData);
app.get('/reloadMostPopularFeatures', routes.reloadMostPopularFeatures);

var path = require('path');
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, '/webresources'));
app.use('/api',express.static(path.join(__dirname, 'webresources/api')));
app.use('/fonts',express.static(path.join(__dirname, 'webresources/fonts')));
app.use('/js',express.static(path.join(__dirname, 'webresources/js')));

app.get('/', function(req, res){
    res.render('dashboard.html')
});

app.get('/dashboard', function(req, res){
    res.render('dashboard.html')
});
