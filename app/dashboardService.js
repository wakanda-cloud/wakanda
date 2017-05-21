"use strict";
var redisConn = require('./redisconnection');
var sleep = require('sleep');
var FetchStatisticService = require('../app/fetchStatisticService')
var ClientStatisticData = require('../app/clientData');
var moment = require('moment');

class DashboardService {

    constructor(response) {
        this._response = response;
    }

    getStatisticsByRegion(data) {
        var getRegion = function (clientCode) {
            let calcRandom = function () {
                return Math.floor(Math.random() * 99) * 0.01;
            };
            switch (parseInt(clientCode)) {
                case(4771):
                    return {latLng: [String(-15.795 + calcRandom()), String(-47.757778 + calcRandom())], name: clientCode};
                    break;
                case(2112):
                    return {latLng: [String(-27.5717+ calcRandom()), String(-48.6256 + calcRandom())], name: clientCode};
                    break;
                case(399):
                    return {latLng: [String(-3.117034+calcRandom()), String(-60.025780 + calcRandom())], name: clientCode};
                    break;
                case(2220):
                    return {latLng: [String(-30.0277 +calcRandom()), String(-51.2287 + calcRandom())], name: clientCode};
                    break;
                case(3547):
                    return {latLng: [String(-27.5717+ calcRandom()), String(-48.6256 + calcRandom())], name: clientCode};
                    break;
                case(1585):
                    return {latLng: [String(-3.117034+calcRandom()), String(-60.025780 + calcRandom())], name: clientCode};
                    break;
                case(3598):
                    return {latLng: [String(-3.117034+calcRandom()), String(-60.025780 + calcRandom())], name: clientCode};
                    break;
                case(2056):
                    return {latLng: [String(-30.0277 +calcRandom()), String(-51.2287 + calcRandom())], name: clientCode};
                    break;
            }
        };

        var clientCodes = [];
        for (let clientIndex = 0; clientIndex < data.length; clientIndex++) {

            clientCodes.push(getRegion(data[clientIndex].client));
        }

        return clientCodes;
    }

    getMostPopularFeatures(numberTop, data) {
        var map = new HashMap();
        for (let clientIndex = 0; clientIndex < data.length; clientIndex++) {
            let clientData = data[clientIndex];
            for (let statisticIndex = 0; statisticIndex < clientData.statisticData.length; statisticIndex++) {
                let statisticData = clientData.statisticData[statisticIndex];

                let keyOfStatistic = statisticData.module + " / " + statisticData.title + " / " + statisticData.linkClicked;
                if(map.get(keyOfStatistic) === undefined) {
                    map.put(keyOfStatistic, new Array());
                }
                map.get(keyOfStatistic).push(statisticData);
            }
        }

        let arrayOrdered = this.orderByMostStatisticRegisteredDesc(map);
        return arrayOrdered.slice(0, numberTop);
    }

    orderByMostStatisticRegisteredDesc(map) {
        return map._dict.sort(function (result, otherResult) {
            return otherResult[1].length - result[1].length;
        })
    }

    getReceivedFrequencyThisWeek(data) {
        var map = new HashMap();

        for (let clientIndex = 0; clientIndex < data.length; clientIndex++) {
            let clientData = data[clientIndex];
            for (let statisticIndex = 0; statisticIndex < clientData.statisticData.length; statisticIndex++) {
                var capturedDate = moment(clientData.statisticData[statisticIndex].capturedDate, 'DD/MM/YYYY');

                let weekOfStatistic = this.getWeekNumber(capturedDate);
                let currentWeek = this.getWeekNumber(new Date());

                if(weekOfStatistic[1] === currentWeek[1]) {
                    let keyOfStatistic = moment(capturedDate).format('YYYY-MM-DD');
                    if(map.get(keyOfStatistic) === undefined) {
                        map.put(keyOfStatistic, new Array());
                    }
                    map.get(keyOfStatistic).push(clientData.statisticData[statisticIndex]);
                }
            }
        }
        return this.orderMapByDate(map);
    }

    orderMapByDate(map) {
        return map._dict.sort(function (a, b) {
            var dateA = moment(a[0], 'YYYY-MM-DD');
            var dateB = moment(b[0], 'YYYY-MM-DD');
            return dateA._d.getTime() - dateB._d.getTime();
        });
    }

    getWeekNumber(d) {
        // Copy date so don't modify original
        d = new Date(+d);
        d.setHours(0,0,0,0);
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setDate(d.getDate() + 4 - (d.getDay()||7));
        // Get first day of year
        var yearStart = new Date(d.getFullYear(),0,1);
        // Calculate full weeks to nearest Thursday
        var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
        // Return array of year and week number
        return [d.getFullYear(), weekNo];
    }

}

var HashMap = function(){
    this._dict = [];
};
HashMap.prototype._get = function(key){
    for(var i=0, couplet; couplet = this._dict[i]; i++){
        if(couplet[0] === key){
            return couplet;
        }
    }
};
HashMap.prototype.put = function(key, value){
    var couplet = this._get(key);
    if(couplet){
        couplet[1] = value;
    }else{
        this._dict.push([key, value]);
    }
    return this; // for chaining
};
HashMap.prototype.get = function(key){
    var couplet = this._get(key);
    if(couplet){
        return couplet[1];
    }
};

module.exports = DashboardService;