const express = require('express')
const router = express.Router()
const controller = require('./controller')
const response = require('../responses')

router.get('/', async (req, res) => {
  if (req.query.type === 'last') {
    controller.getLast()
      .then(message => response.success(req, res, 200, message))
      .catch(error => response.error(req, res, 404, error, 'Can´t get last movements'))
  } else if (req.query.type === 'balance') {
    controller.getBalance(req.body)
      .then(message => response.success(req, res, 201, message))
      .catch(error => response.error(req, res, 404, error, 'Can´t get balance'))
  } else {
    controller.getAll()
      .then(message => response.success(req, res, 200, message))
      .catch(error => response.error(req, res, 404, error, 'Can´t get movements'))
  }
})

router.post('/', async (req, res) => {
  controller.addMovement(req.body)
    .then(message => response.success(req, res, 201, message))
    .catch(error => response.error(req, res, 401, error, 'Can´t add movement'))
})

router.patch('/:movementID', async (req, res) => {
  controller.modifyMovement(req.params.movementID, req.body)
    .then(message => response.success(req, res, 201, message))
    .catch(error => response.error(req, res, 401, error, 'Can´t modify movement'))
})

module.exports = router
