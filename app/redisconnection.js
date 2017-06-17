var redis = require('redis');
var redisClient = null;

if (process.env.REDISCLOUD_URL) {
    redisClient = redis.createClient(process.env.REDISCLOUD_URL, {no_ready_check: true});
} else if (process.env.REDIS_URL) {
    redisClient = redis.createClient(process.env.REDIS_URL, {no_ready_check: true});
} else {
    redisClient = redis.createClient();
}

redisClient.on('connect', function() {
    var environment = process.env.REDISCLOUD_URL ? 'production' : 'developer';
    console.log('Redis %s environment connected', environment);
});

module.exports = redisClient;
