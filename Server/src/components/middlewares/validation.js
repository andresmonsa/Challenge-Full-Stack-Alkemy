const { validationResult } = require('express-validator')

const validation = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log(errors, 'validation'.red)
    return res.status(401).json(errors)
  }
  next()
}

module.exports = validation
