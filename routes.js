'use strict';

var StatisticData = require("./app/entity/Statistic");
var DashboardService = require("./app/dashboard/DashboardService");
var StatisticService = require("./app/StatisticService");
var SecurityService = require("./app/SecurityService");
var StatisticDAO = require("./app/mongo/StatisticDAO");

let routes = function(){};
routes.listStatistics = function (dataReceived, res) {
    let filter = getJsonData(dataReceived, res);
    new StatisticService().list(filter.client, function (data) {
        res.status(200).send(data);
    });
};

routes.listStatisticsPost = function(req, res) {
    routes.listStatistics(req.body, res);
};

routes.listStatisticsGet = function(req, res) {
    let payload = req.param("payload");
    if(payload.indexOf(" ") > -1) {
        res.status(200).send("You must replace all '+' characters to %2B, if the error persists please check on web: 'RFC 2396'");
    } else {
        routes.listStatistics(payload, res);
    }
};

routes.registerStatistic = function(req, res) {
    let jsonData = getJsonData(req.body.data, res);

    new StatisticService().register(new StatisticData(jsonData));

    res.status(202).send("done");
};

routes.fetchDashboardData = function(req, res) {
    new StatisticDAO().findAll(function(clientData) {
        res.status(200).send(new DashboardService().process(clientData));
    });
};

routes.reloadMostPopularFeatures = function(req, res) {
    new StatisticDAO().findAll(function(clientData) {
        let mostPopFeatData = new DashboardService().reloadMostPopularFeatures(clientData, req.query.quantity);
        res.status(200).send(mostPopFeatData);
    });
};

routes.deleteStatistics = function(req, res) {
    try {
        var key = getJsonData(req.body.data, res).key;
    } catch (err) {
        res.status(400).send("Data received are different than expected: " + err);
    }

    if(process.env.DECRYPT_KEY === key) {
        new StatisticDAO().deleteAll(function() {
            res.status(202);
        });
    } else {
        res.status(401).send("Unauthorized");
    }
};

function getJsonData(data, res) {
    let jsonData = new SecurityService().decryptJSON(data);
    if(jsonData.token && jsonData.token !== process.env.SECURITY_TOKEN) {
        res.status(401).send("Unauthorized");
    }
    return jsonData;
}

module.exports = routes;
