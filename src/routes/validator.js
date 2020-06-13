const { validationResult, checkSchema } = require('express-validator')

module.exports = schema => [checkSchema(schema), (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const err = new Error('Invalid Input')
     err.data = errors.array()
     next(err)
  }
  next()
}]
