module.exports = {
  time: {
    in: ['body'],
    custom: {
      options: value => (new Date(value)).getTime() > 0
    },
    errorMessage: 'Must be Timestamp'
  },
  message: {
    in: ['body'],
    isString: {
      errorMessage: 'Must be string (UTF-8)'
    }
  }
}
