"use strict";
var redisConn = require('./redisconnection');
var FetchStatisticService = require('../app/fetchStatisticService')
var ClientStatisticData = require('../app/clientData');

class StatisticService {

    list(client, listener) {
        if(client === "*") {
            this.getAllStatisticRegistered(listener);
        } else {
            redisConn.get(client, function (err, object) {
                listener.call(this, object);
            });
        }
    }

    getAllStatisticRegistered(listener) {
        var fetchStatisticService = new FetchStatisticService(listener);
        fetchStatisticService.fetchAll();
    }

    register(statisticData, onerror) {
        return this._registerOnDatabase(statisticData, onerror);
    }

    _registerOnDatabase(statisticData) {
        redisConn.get(statisticData.client, function (err, reply) {
            var clientStatisticDataToPersist = null;

            if (reply !== null) {
                if (parseJSON(reply) === null) return;
                clientStatisticDataToPersist = new ClientStatisticData(parseJSON(reply));
                clientStatisticDataToPersist.addStatisticData(statisticData);
            } else {
                clientStatisticDataToPersist = new ClientStatisticData();
                clientStatisticDataToPersist.client = statisticData.client;
                clientStatisticDataToPersist.addStatisticData(statisticData);
            }

            var json = JSON.stringify(clientStatisticDataToPersist.toJSON());
            console.log("registered new statistic: " + statisticData.client);
            redisConn.set(statisticData.client, json);
        });
    }
}

let parseJSON = function (reply) {
    try {
        return JSON.parse(reply);
    } catch(e) {
        console.log("Error on parse data to JSON, data received: " + reply);
        return null;
    }
};

module.exports = new StatisticService();