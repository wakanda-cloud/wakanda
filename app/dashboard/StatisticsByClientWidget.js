'use strict';

var HashMap = require('hashmap');

class StatisticsByClientWidget {

    process(data) {
        return this.getUniqueClientsData(data);
    }

    getUniqueClientsData(data) {
        var newClientsInThisWeek = new HashMap();

        for (let clientIndex = 0; clientIndex < data.length; clientIndex++) {
            let clientData = data[clientIndex];
            let statisticData = clientData.statisticData;
            this.orderDescByDataToStartWithLastDays(statisticData);
            for (let statisticIndex = 0; statisticIndex < statisticData.length; statisticIndex++) {
                if(moment().diff(statisticData[statisticIndex], 'days') <= 7) {
                    newClientsInThisWeek.set(clientData.client, "");
                }
            }
        }

        return {
            newClients : newClientsInThisWeek,
            total : data.length
        };
    }

    orderDescByDataToStartWithLastDays(clientData) {
        clientData.statisticData.sort(function (a, b) {
            let dateA = moment(a.capturedDate, 'DD-MM-YYYY');
            let dateB = moment(b.capturedDate, 'DD-MM-YYYY');
            return dateB._d.getTime() - dateA._d.getTime();
        });
    }
}

module.exports = StatisticsByClientWidget;