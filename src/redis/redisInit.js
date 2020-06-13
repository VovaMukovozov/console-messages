const Promise = require('bluebird')
const redis = require('redis')
const { promisify } = require('util')
const { redis: { host, port, db, prefix } } = require('../config')


const client = redis.createClient(port, host, { db })
const hgetall = promisify(client.hgetall).bind(client)
const hdel = promisify(client.hdel).bind(client)


const getAllMessages = async () => hgetall(prefix)

module.exports = async () => {
  const allMessages = await getAllMessages()
  if(!allMessages){
    return true
  }
  const keys = Object.keys(allMessages)
  const now = (new Date()).getTime()
  if (keys.length !== 0) {
      Promise.map(keys, async key => {
        if(key < now) {
          console.log(key)
          console.log(`${(new Date(parseInt(key)))}: ${getAllMessages[key]}`)
          await hdel(prefix, key)
        }
      })
  }
}
