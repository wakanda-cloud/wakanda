"use strict";
var FetchStatisticService = require('../app/fetchStatisticService')
var ClientStatisticData = require('../app/clientData');
var MongoClient = require('../app/MongoConnection');

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
        MongoClient.connect('mongodb://localhost/statistics', function(err, db) {
            db.collection("clients").findOne({client : statisticData.client}, function(err, reply) {
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

                db.collection("clients").insertOne(clientStatisticDataToPersist, function(err) {
                    if (err) throw err;
                    console.log("#mongo - registered new statistic: " + statisticData.client);
                    db.close();
                });
            });
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