const redis = require('redis');

module.exports.createClient = () => {
    return redis.createClient(
        process.env.REDISCACHE_PORT,
        process.env.REDISCACHE_HOSTNAME,
        { auth_pass: process.env.REDISCACHE_KEY, tls: { servername: process.env.REDISCACHE_HOSTNAME } });
}

// module.exports.createClient = () => {
//     return redis.createClient({host : 'localhost', port : 6379});
// }