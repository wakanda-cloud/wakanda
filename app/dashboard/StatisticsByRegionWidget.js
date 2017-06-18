'use strict';

class StatisticsByRegionWidget {

    process(data) {
        return this.getStatisticsByRegion(data);
    }

    getStatisticsByRegion(data) {
        var clientCodes = [];
        for (let clientIndex = 0; clientIndex < data.length; clientIndex++) {
            let clientData = data[clientIndex];
            if (clientData.statisticData && clientData.statisticData[0].location) {
                this.pushStatisticLocation(clientData, clientCodes);
            } else {
                this.pushClientLocation(clientData, clientCodes);
            }
        }
        return clientCodes;
    }

    pushClientLocation(clientData, clientCodes) {
        clientCodes.push(this.getRegion(clientData));
    }

    pushStatisticLocation(clientData, clientCodes) {
        let firstStatisticData = clientData.statisticData[0];
        let statisticLocation = firstStatisticData.location.split(";");
        clientCodes.push({
            latLng: [statisticLocation[0], statisticLocation[1]],
            name: clientData.client
        });
    }

    /**
     * Fake data, need be implemented
     * @param clientCode
     * @returns {*}
     */
    getRegion(clientCode) {
        let calcRandom = function () {
            return (Math.floor(Math.random() * 105) * 0.02);
        };

        switch (parseInt(clientCode)) {
            case(4771):
                return {
                    latLng: [String(-15.795 + calcRandom()), String(-47.757778 + calcRandom())],
                    name: clientCode,
                    region: 'DF'
                };
                break;
            case(2112):
                return {
                    latLng: [String(-27.5717 - calcRandom()), String(-48.6256 - calcRandom())],
                    name: clientCode,
                    region: 'SC'
                };
                break;
            case(399):
                return {
                    latLng: [String(-3.117034 + calcRandom()), String(-60.025780 - calcRandom())],
                    name: clientCode,
                    region: 'AM'
                };
                break;
            case(2220):
                return {
                    latLng: [String(-30.0277 + calcRandom()), String(-51.2287 + calcRandom())],
                    name: clientCode,
                    region: 'RS'
                };
                break;
            case(3547):
                return {
                    latLng: [String(-27.5717 + calcRandom()), String(-48.6256 + calcRandom())],
                    name: clientCode,
                    region: 'SC'
                };
                break;
            case(1585):
                return {
                    latLng: [String(-3.117034 + calcRandom()), String(-60.025780 + calcRandom())],
                    name: clientCode,
                    region: 'AM'
                };
                break;
            case(3598):
                return {
                    latLng: [String(-3.117034 + calcRandom()), String(-60.025780 + calcRandom())],
                    name: clientCode,
                    region: 'AM'
                };
                break;
            case(2056):
                return {
                    latLng: [String(-30.0277 + calcRandom()), String(-51.2287 + calcRandom())],
                    name: clientCode,
                    region: 'RS'
                };
                break;
            default:
                let mostRandomicValue = function () {
                    return (Math.floor(Math.random() * 999) * 0.01);
                };
                return {
                    latLng: [String(-15.795 + mostRandomicValue()), String(-47.757778 + mostRandomicValue())],
                    name: clientCode,
                    region: 'DF'
                };
                break;
        }
    }
}

module
    .exports = StatisticsByRegionWidget;