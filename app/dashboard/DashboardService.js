"use strict";

var FrequencyStatisticRegisterWeekWidget = require('./FrequencyStatisticRegisterWeekWidget');
var StatisticsByRegionWidget = require('./StatisticsByRegionWidget');
var MostPopularFeaturesWidget = require('./MostPopularFeaturesWidget');
var StatisticsByClientWidget = require('./StatisticsByClientWidget');
var Client = require('../entity/Customer');

class DashboardService {

    process(customerStatistics) {
        return {
            mostPopularFeatures: new MostPopularFeaturesWidget().process(8, customerStatistics),
            frequencyReceived : new FrequencyStatisticRegisterWeekWidget().process(customerStatistics),
            statisticByRegion : new StatisticsByRegionWidget().process(customerStatistics),
            uniqueClients : new StatisticsByClientWidget().process(customerStatistics),
            topMostActiveClients : function() {

                customerStatistics.sort(function(a, b) {
                    return b.statisticData.length - a.statisticData.length;
                });

                return customerStatistics.slice(0,5);
            }()
        }
    }

    reloadMostPopularFeatures(data, quantity) {
        return new MostPopularFeaturesWidget().process(quantity, data);
    }
}

module.exports = DashboardService;