const { env } = process

module.exports = {
  redis: {
    port: env.REDIS_PORT,
    host: env.REDIS_HOST,
    db: 0,
    prefix: 'reminder'
  }
}
