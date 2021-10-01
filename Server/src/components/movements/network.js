const express = require('express')
const router = express.Router()
const controller = require('./controller')
const response = require('../responses')

router.get('/', async (req, res) => {
  console.log(req.query.last)
  if (req.query.last === undefined) {
    controller.getAll()
      .then(message => response.success(req, res, 200, message))
      .catch(error => response.error(req, res, 404, error, 'Can´t get movements'))
  } else {
    controller.getLast()
      .then(message => response.success(req, res, 200, message))
      .catch(error => response.error(req, res, 404, error, 'Can´t get last movements'))
  }
})

router.post('/', async (req, res) => {
  controller.addMovement(req.body)
    .then(message => response.success(req, res, 201, message))
    .catch(error => response.error(req, res, 401, error, 'Can´t add movement'))
})

router.get('/balance', async (req, res) => {
  controller.getBalance(req.body)
    .then(message => response.success(req, res, 201, message))
    .catch(error => response.error(req, res, 401, error, 'Can´t add movement'))
})

module.exports = router
