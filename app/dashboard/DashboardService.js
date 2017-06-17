"use strict";

var FrequencyStatisticRegisterWeekWidget = require('./FrequencyStatisticRegisterWeekWidget');
var StatisticsByRegionWidget = require('./StatisticsByRegionWidget');
var MostPopularFeaturesWidget = require('./MostPopularFeaturesWidget');
var StatisticByClientWdiget = require('./StatisticsByClientWidget')

class DashboardService {

    process(data) {
        return {
            mostPopularFeatures: new MostPopularFeaturesWidget().process(8, data),
            frequencyReceived : new FrequencyStatisticRegisterWeekWidget().process(data),
            statisticByRegion : new StatisticsByRegionWidget().process(data),
            uniqueClients : new StatisticsByRegionWidget().process(data)
        }
    }

    reloadMostPopularFeatures(data, quantity) {
        return new MostPopularFeaturesWidget().process(quantity, data);
    }
}

module.exports = DashboardService;