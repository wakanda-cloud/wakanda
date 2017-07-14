'use strict';

var Statistic = require("../entity/Statistic");
var Customer = require("../entity/Customer");
var MongoClient = require("./MongoConnection");
var ObjectId = require('mongodb').ObjectID;

var uristring = process.env.MONGODB_URI || 'mongodb://localhost/statistics';

class StatisticDAO {

    findAll(callback) {
        MongoClient.connect(uristring, function (err, db) {
            db.collection("customer").find().toArray(function (err, array) {
                callback.call(this, array);
                db.close();
            });
        });
    }

    findAllFromCustomer(id, callback) {
        MongoClient.connect(uristring, function (err, db) {
            db.collection("customer").findOne({client: id}, function (err, document) {
                db.close();
                callback.call(this, document);
            });
        });

    }

    persist(statisticData) {
        let that = this;
        MongoClient.connect(uristring, function (err, db) {
            let customerCollection = db.collection("customer");
            customerCollection.findOne({client: statisticData.client}, function (err, existingCustomerData) {
                if (existingCustomerData !== null) {
                    that.updateCustomerStatistics(existingCustomerData, statisticData, db);
                } else {
                    that.insertCustomerStatistics(statisticData, db, that);
                }
            });
        });
    };

    insertCustomerStatistics(statisticData, db, that) {
        let statistic = new Statistic(statisticData) ;

        let clientStatisticDataToPersist = new Customer();
        clientStatisticDataToPersist.id = ObjectId();
        clientStatisticDataToPersist.client = statistic.client;
        clientStatisticDataToPersist.addStatisticData(statistic.toJSON());
        db.collection("customer").insertOne(clientStatisticDataToPersist.toJSON(), function (err) {
            that.finishMongoConnection(err, statistic, db);
        });
    }

    updateCustomerStatistics(existingCustomerData, statisticData, db) {
        let that = this;
        let statistic = new Statistic(statisticData) ;
        let clientStatisticDataToPersist = new Customer(existingCustomerData);
        clientStatisticDataToPersist.addStatisticData(statistic.toJSON());

        db.collection("customer").update({_id: ObjectId(existingCustomerData._id)}, clientStatisticDataToPersist.toJSON(), { multi: false }, function (err) {
            that.finishMongoConnection(err, statistic, db);
        });
    }

    finishMongoConnection(err, statistic, db) {
        if (err) throw err;
        console.log("#mongo - registered new statistic: " + statistic.client);
        db.close();
    }
}

let parseJSON = function (reply) {
    try {
        return JSON.parse(reply);
    } catch(e) {
        console.log("Error on parse data to JSON, data received: " + reply);
        return null;
    }
};

module.exports = StatisticDAO;