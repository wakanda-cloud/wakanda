'use strict';

var HashMap = require('hashmap');
var moment = require('moment');

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

            let clientHasStatisticAfter7Days = false;
            for (let statisticIndex = 0; statisticIndex < statisticData.length; statisticIndex++) {
                var capturedDate = moment(clientData.statisticData[statisticIndex].capturedDate, 'DD/MM/YYYY');
                let statisticDate = moment(capturedDate);

                if(moment().diff(statisticDate, 'days') >= 8) {
                    clientHasStatisticAfter7Days = true;
                    break;
                }
            }

            if(!clientHasStatisticAfter7Days) {
                newClientsInThisWeek.set(clientData.client, "");
            }
        }

        return {
            newClients : newClientsInThisWeek.count(),
            total : data.length
        };
    }

    orderDescByDataToStartWithLastDays(array) {
        array.sort(function (a, b) {
            let dateA = moment(a.capturedDate, 'DD-MM-YYYY');
            let dateB = moment(b.capturedDate, 'DD-MM-YYYY');
            return dateB._d.getTime() - dateA._d.getTime();
        });
    }
}

module.exports = StatisticsByClientWidget;