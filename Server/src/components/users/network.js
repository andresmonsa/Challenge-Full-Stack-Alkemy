const express = require('express')
const router = express.Router()
const controller = require('./controller')
const { check } = require('express-validator')
const response = require('../responses')
// const jwt = require('jsonwebtoken')
// const { SECRET } = process.env
const { verifyToken } = require('../middlewares/verifyToken')
const { validationEmail } = require('../middlewares/dbValidators')
const validation = require('../middlewares/validation')

router.post('/', [
  check('name', 'Name is required').notEmpty(),
  check('lastName', 'lastName is required').notEmpty(),
  check('email', 'Mail is required').notEmpty(),
  check('email', 'Mail is not validate').isEmail(),
  check('email', 'email exist').custom(validationEmail),
  check('password', 'Password is required and must be more than 6 letters').isLength({ min: 6 }).notEmpty(),
  validation
], async (req, res) => {
  controller.newUser(req.body)
    .then(message => response.success(req, res, 200, message))
    .catch(error => response.error(req, res, 404, { message: 'Please try with another email' }, error.message))
})

router.post('/login', [
  check('email', 'Mail is required').notEmpty(),
  check('email', 'Mail is not validate').isEmail(),
  check('password', 'Password is required and must be more than 6 letters').isLength({ min: 6 }).notEmpty(),
  validation
], async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  controller.login(email, password)
    .then(message => {
    // res.cookie('nToken', message.token, { maxAge: 900000, httpOnly: true })
      response.success(req, res, 201, message)
    })
    .catch(e => response.error(req, res, 400, e.message, 'No session'))
})

// jwt.verify(req.token, SECRET, (error, authData) => {
//   if (error) {
//     res.sendStatus(403)
//   } else {
//     res.json({
//       mensaje: 'GET OK',
//       authData
//     })
//   }
// })
module.exports = router
