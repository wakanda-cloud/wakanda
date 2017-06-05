"use strict";

var FrequencyStatisticRegisterWeekWidget = require('./FrequencyStatisticRegisterWeekWidget');
var StatisticsByRegionWidget = require('./StatisticsByRegionWidget');
var MostPopularFeaturesWidget = require('./MostPopularFeaturesWidget');

class DashboardService {

    process(data) {
        return {
            mostPopularFeatures: new MostPopularFeaturesWidget().process(8, data),
            frequencyReceived : new FrequencyStatisticRegisterWeekWidget().process(data),
            statisticByRegion : new StatisticsByRegionWidget().process(data)
        }
    }

    reloadMostPopularFeatures(quantity, data) {
        new MostPopularFeaturesWidget().process(quantity, data);
    }
}

module.exports = DashboardService;