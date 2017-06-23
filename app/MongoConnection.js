var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var uristring = process.env.MONGODB_URI || 'mongodb://localhost/statistics';

MongoClient.connect(uristring, function(err, db) {
    if (err) throw err;
    db.createCollection("clients", function(err, res) {
        if (err) throw err;
        console.log("Table clients created!");
        db.close();
    });
});


module.exports = MongoClient;


