"use strict";

var StatisticDAO = require("./mongo/StatisticDAO");

class StatisticService {

    constructor() {
        this.statisticDAO = new StatisticDAO();
    }

    list(client, listener) {
        if(client === "*") {
            this.statisticDAO.findAll(function (object) {
                listener.call(this, object);
            });
        } else {
            this.statisticDAO.findAllFromCustomer(client, function (object) {
                listener.call(this, object);
            });
        }
    }

    register(statisticData, onError) {
        try {
            this.statisticDAO.persist(statisticData);
        } catch (err) {
            if(onError)onError.call(err)
            else console.log(err);
        }
    }
}

module.exports = StatisticService;