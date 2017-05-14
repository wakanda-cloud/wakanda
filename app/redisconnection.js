var redis = require('redis');
var redisClient = null;

if (process.env.REDISCLOUD_URL) {
    redisClient = redis.createClient(process.env.REDISCLOUD_URL, {no_ready_check: true});
} else {
    var config = require('../config/config');
    redisClient = redis.createClient(config.redisConf);
    redisClient.auth(config.redisConf.password);
}

redisClient.on('connect', function() {
    var environment = process.env.REDISCLOUD_URL ? 'production' : 'developer';
    console.log('redis %s production environment connected', environment);
});

module.exports = redisClient;