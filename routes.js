var statisticService = require('./app/statisticService');
var StatisticData = require('./app/statisticData');
var routes = function(){};
var sleep = require('sleep');
var crypto = require('crypto');
var securityService = require('./app/securityService');

routes.listStatistics = function(req, res) {
    var jsonData = getJsonData(req.body, res);
    statisticService.list(jsonData.client, function(data) {
        res.status(200).send(data);
    });
};

routes.registerStatistic = function(req, res) {
    var jsonData = getJsonData(req.body, res);
    statisticService.register(new StatisticData(jsonData));
    res.status(200).send("done");
};


function getJsonData(data, res) {
    if(process.env.SECURITY_TOKEN) {
        var jsonData = securityService.decryptJSON(data);
        if(jsonData.token !== process.env.SECURITY_TOKEN) {
            res.status(401).send("Unauthorized");
        }
        return jsonData;
    }
    return JSON.parse(data);
}


module.exports = routes;
