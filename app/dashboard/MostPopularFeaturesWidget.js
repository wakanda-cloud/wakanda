'use strict'

var HashMap = require('hashmap');

class MostPopularFeaturesWidget  {

    process(numberTop, data) {
        return this.getMostPopularFeatures(numberTop, data);
    }

    getMostPopularFeatures(numberTop, data) {
        var map = new HashMap();
        for (let clientIndex = 0; clientIndex < data.length; clientIndex++) {
            let clientData = data[clientIndex];
            for (let statisticIndex = 0; statisticIndex < clientData.statisticData.length; statisticIndex++) {
                let statisticData = clientData.statisticData[statisticIndex];

                let keyOfStatistic = statisticData.module + " / " + statisticData.title + " / " + statisticData.linkClicked;
                if(map.get(keyOfStatistic) === undefined) {
                    map.set(keyOfStatistic, new Array());
                }
                map.get(keyOfStatistic).push(statisticData);
            }
        }

        let values = map.values();
        this.orderByMostStatisticRegisteredDesc(values);
        return values.slice(0, numberTop);
    }

    orderByMostStatisticRegisteredDesc(array) {
        array.sort(function (result, otherResult) {
            return otherResult.length - result.length;
        });
    }
}

module.exports = MostPopularFeaturesWidget;