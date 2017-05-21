'use strict';

var statisticService = require('./app/statisticService');
var DashboardService = require('./app/dashboardService');
var StatisticData = require('./app/statisticData');
var FetchStatisticService = require('./app/fetchStatisticService');
var routes = function(){};
var sleep = require('sleep');
var crypto = require('crypto');
var securityService = require('./app/securityService');

routes.listStatistics = function (dataReceived, res) {
    var filter = getJsonData(dataReceived, res);
    statisticService.list(filter.client, function (data) {
        res.status(200).send(data);
    });
};

routes.listStatisticsPost = function(req, res) {
    routes.listStatistics(req.body, res);
};

routes.listStatisticsGet = function(req, res) {
    var payload = req.param("payload");
    if(payload.indexOf(" ") > -1) {
        res.status(200).send("You must replace all '+' characters to %2B, if the error persists please check on web: 'RFC 2396' ");
    } else {
        routes.listStatistics(payload, res);
    }
};

routes.registerStatistic = function(req, res) {
    var jsonData = getJsonData(req.body, res);
    statisticService.register(new StatisticData(jsonData));
    res.status(200).send("done");
};

routes.fetchDashboardData = function(req, res) {
    let dashboardService = new DashboardService();

    var fetchStatisticService = new FetchStatisticService(function(clientData) {
        var pageData = {
            mostPopularFeatures: dashboardService.getMostPopularFeatures(8, clientData),
            frequencyReceived : dashboardService.getReceivedFrequencyThisWeek(clientData),
            statisticByRegion : dashboardService.getStatisticsByRegion(clientData)
        };
        res.status(200).send(pageData);
    });

    fetchStatisticService.fetchAll();
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
