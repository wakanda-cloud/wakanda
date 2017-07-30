var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var uristring = process.env.MONGODB_URI || 'mongodb://localhost/statistics';

MongoClient.connect(uristring, function(err, db) {
    if (err) throw err;
    db.createCollection("customer", function(err, res) {
        if (err) throw err;
        console.log("Table customer created!");
        db.close();
    });
});


module.exports = MongoClient;


