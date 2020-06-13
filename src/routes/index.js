const router = require('express').Router()
const validator = require('./validator')
const { redis: { prefix } } = require('../config')
const client = require('../redis/publisher.js')
const schema = require('./schema.js')

router.post('/', validator(schema), async (req, res, next) => {
  const { time, message } = req.body
  const timestamp = (new Date(time)).getTime()
  client
    .multi()
    .set(timestamp, time)
    .pexpireat(timestamp, timestamp)
    .hmset(prefix, timestamp, message)
    .exec((err, replies) => {
      if(err) {
        next(err)
      }
      res.status(201).send('OK')
    })
})


module.exports = router
