'use strict'

var redisConn = require('./redisconnection');

class FetchStatisticService {

    constructor(listener) {
        this.listener = listener;
    }

    getAllKeys(next) {
        redisConn.keys("*", next);
    }

    getAllValuesFromKeys(keys, next) {
        redisConn.mget(keys, next);
    }

    convertAllDataToJSON(data, next) {
        var jsonData = [];
        data.forEach(function (data) {
            jsonData.push(JSON.parse(data));
        });
        next.call(this, jsonData);
    }

    //how could be better? promisses? callback hell filosofy?
    fetchAll() {
        var context = this;
        this.getAllKeys(function(err, keys) {
            context.getAllValuesFromKeys(keys, function(err, data) {
                context.convertAllDataToJSON(data, context.listener);
            })
        })
    }
}

module.exports = FetchStatisticService;
