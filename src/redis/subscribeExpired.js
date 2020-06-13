const redis = require('redis')
const { promisify } = require('util')
const { redis: { host, port, db, prefix } } = require('../config')

const client = redis.createClient(port, host, { db })
const hget = promisify(client.hget).bind(client)
const hdel = promisify(client.hdel).bind(client)

module.exports = (e,r) => {
  const sub = redis.createClient(port, host, { db })
  const expiredSubKey = `__keyevent@${db}__:expired`
  sub.subscribe(expiredSubKey, async () => {
    console.log(`[i] Subscribed to ${expiredSubKey} event channel : ${r}` )
    sub.on('message', async (chan, msg) => {
      try {
        console.log(msg)
        console.log(`${(new Date(parseInt(msg)))}: ${await hget(prefix, msg)}`)
        await hdel(prefix, msg)
      } catch (err) {
        console.error(err)
      }
    })
  })
}
