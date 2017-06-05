'use strict';

var moment = require('moment');
var HashMap = require('hashmap');

class FrequencyStatisticRegisterWidget {

    process(data) {
        return this.getReceivedFrequencyThisWeek(data);
    }

    getReceivedFrequencyThisWeek(data) {
        var map = new HashMap();

        for (let clientIndex = 0; clientIndex < data.length; clientIndex++) {
            let clientData = data[clientIndex];
            for (let statisticIndex = 0; statisticIndex < clientData.statisticData.length; statisticIndex++) {
                var capturedDate = moment(clientData.statisticData[statisticIndex].capturedDate, 'DD/MM/YYYY');

                let weekOfStatistic = moment(capturedDate).isoWeek();
                let currentWeek = moment(new Date()).isoWeek();

                if (weekOfStatistic[1] === currentWeek[1]) {
                    let keyOfStatistic = moment(capturedDate).format('YYYY-MM-DD');
                    if (map.get(keyOfStatistic) === undefined) {
                        map.set(keyOfStatistic, new Array());
                    }
                    map.get(keyOfStatistic).push(clientData.statisticData[statisticIndex]);
                }
            }
        }
        let values = map.values();
        this.orderMapByDate(values);
        return values.slice(0, 7);
    }

    orderMapByDate(array) {
        array.sort(function (a, b) {
            var dateA = moment(a[0], 'YYYY-MM-DD');
            var dateB = moment(b[0], 'YYYY-MM-DD');
            return dateA._d.getTime() - dateB._d.getTime();
        });
    }
}

module.exports = FrequencyStatisticRegisterWidget;