const jwt = require('jsonwebtoken')

const tokenValidation = (req, res, next) => {
  const token = req.header('token')
  if (!token) {
    throw new Error('Should include a token')
  }

  try {
    jwt.verify(token, process.env.SECRET)

    next()
  } catch (error) {
    console.log('err acá ')
    throw new Error(error)
  }
}

module.exports = tokenValidation
