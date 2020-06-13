const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const redisInit = require('./src/redis/redisInit')
const routes = require('./src/routes/index')
const app = express()

const port = process.env.PORT || '3000'
const server = http.createServer(app)

app.set('port', port)
app.use(cors())
app.use(bodyParser.json())

app.use('/message', routes)

// catch 404 and forward to error handler
app.use( (req, res, next) => {
  const err = new Error('Not Found')
  err.statusCode = 404
  next(err)
})

// error handler
app.use( (err, req, res, next) => {
  console.error(err)
  res.status(err.statusCode || 500)
  res.json({
    message: err.message,
    stack: err.stack,
    data: err.data || null
  })
})

redisInit().then(() => {
  server.listen(port, () => {
    console.log(`API: Listening on port: ${port} env: ${app.get("env")}`)
  })
}).catch(err => {
  console.error(err)
  process.exit(1)
})
