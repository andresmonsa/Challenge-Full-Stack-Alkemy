const express = require('express')
const router = express.Router()
const controller = require('./controller')
const response = require('../responses')

router.get('/:id', async (req, res) => {
  if (req.query.type === 'last') {
    console.log(req.params.id)
    controller.getLast(req.params.id)
      .then(message => response.success(req, res, 200, message))
      .catch(error => response.error(req, res, 404, error, 'Can´t get the last movements'))
  } else if (req.query.type === 'balance') {
    controller.getBalance(req.params.id)
      .then(message => response.success(req, res, 201, message))
      .catch(error => response.error(req, res, 404, error, 'Can´t get the balance'))
  } else {
    controller.getAll(req.params.id)
      .then(message => response.success(req, res, 200, message))
      .catch(error => response.error(req, res, 404, error, 'Can´t get the movements'))
  }
})

router.post('/', async (req, res) => {
  controller.addMovement(req.body)
    .then(message => response.success(req, res, 201, message))
    .catch(error => response.error(req, res, 400, error, 'Can´t add the movement'))
})

router.patch('/:movementID', async (req, res) => {
  controller.modifyMovement(req.params.movementID, req.body)
    .then(message => response.success(req, res, 201, message))
    .catch(error => response.error(req, res, 400, error, 'Can´t modify the movement'))
})
router.delete('/:movementID', async (req, res) => {
  controller.deleteMovement(req.params.movementID)
    .then(message => response.success(req, res, 201, message))
    .catch(error => response.error(req, res, 400, error, 'Can´t delete the movement'))
})

module.exports = router
