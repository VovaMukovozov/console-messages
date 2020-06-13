const { promisify } = require('util')
const redis = require('redis')
const { redis: { host, port } } = require('../config')
const subscribeExpired = require('./subscribeExpired')

const publisher = redis.createClient(port, host)
publisher.send_command('config', ['set','notify-keyspace-events','Ex'], subscribeExpired)

module.exports = publisher
