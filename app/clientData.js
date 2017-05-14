"use strict";

var StatisticData = require('../app/statisticData');

class ClientStatisticData {

    constructor(data) {
        if(data === undefined) {
            this._statisticData = [];
        } else {
            this._client = data.client;
            this._statisticData = data.statisticData;
        }
    }

    get client() {
        return this._client;
    }

    set client(client) {
        this._client = client;
    }

    get statisticData() {
        return this._statisticData;
    }

    addStatisticData(statisticData) {
        if(!statisticData instanceof StatisticData) {
            throw "ClienteStatisticData expect StatisticData dto on setttr property"
        }
        this._statisticData.push(statisticData);
    }

    toJSON() {
        return {
            client: this.client,
            statisticData : this.statisticData
        }
    }
}

module.exports = ClientStatisticData;