var statisticService = require('./app/statisticService');
var StatisticData = require('./app/statisticData');
var routes = function(){};
var sleep = require('sleep');

function verifyAuth(req, res) {

}

routes.listStatistics = function(req, res) {
    verifyAuth(req, res);
    statisticService.list(req.query.client, function(data) {
        res.status(200).send(data);
    });
};

routes.registerStatistic = function(req, res) {
    verifyAuth(req, res);
    statisticService.register(new StatisticData(req.body));
    res.status(200).send("done");
};

module.exports = routes;
