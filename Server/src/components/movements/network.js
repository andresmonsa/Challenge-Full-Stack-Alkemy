const express = require('express')
const router = express.Router()
const controller = require('./controller')
const response = require('../responses')
// const tokenValidation = require('../middlewares/tokenValidation')
const jwt = require('jsonwebtoken')

router.get('/:id', async (req, res, next) => {
  const token = req.header('token')
  if (!token) return res.status(403).send('Without Token')
  jwt.verify(token, process.env.SECRET, (error) => {
    if (error) {
      return res.status(403).send('Invalid Token')
    } else {
      if (req.query.type === 'last') {
        controller.getLast(req.params.id, token)
          .then(message => response.success(req, res, 200, message))
          .catch(error => response.error(req, res, 404, error, 'Can´t get the last movements'))
      } else if (req.query.type === 'balance') {
        controller.getBalance(req.params.id, token)
          .then(message => response.success(req, res, 201, message))
          .catch(error => response.error(req, res, 404, error, 'Can´t get the balance'))
      } else {
        controller.getAll(req.params.id, token)
          .then(message => response.success(req, res, 200, message))
          .catch(error => response.error(req, res, 404, error, 'Can´t get all the movements'))
      }
    }
  })
})

router.post('/', async (req, res) => {
  const token = req.header('token')
  if (!token) return res.status(403).send('Without Token')
  jwt.verify(token, process.env.SECRET, (error) => {
    if (error) {
      return res.status(403).send('Invalid Token')
    } else {
      controller.addMovement(req.body)
        .then(message => response.success(req, res, 201, message))
        .catch(error => response.error(req, res, 400, error, 'Can´t add the movement'))
    }
  })
})

router.patch('/:movementID', async (req, res) => {
  const token = req.header('token')
  if (!token) return res.status(403).send('Without Token')
  jwt.verify(token, process.env.SECRET, (error) => {
    if (error) {
      return res.status(403).send('Invalid Token')
    } else {
      controller.modifyMovement(req.params.movementID, req.body)
        .then(message => response.success(req, res, 201, message))
        .catch(error => response.error(req, res, 400, error, 'Can´t modify the movement'))
    }
  })
})

router.delete('/:movementID', async (req, res) => {
  const token = req.header('token')
  if (!token) return res.status(403).send('Without Token')
  jwt.verify(token, process.env.SECRET, (error) => {
    if (error) {
      return res.status(403).send('Invalid Token')
    } else {
      controller.deleteMovement(req.params.movementID)
        .then(message => response.success(req, res, 201, message))
        .catch(error => response.error(req, res, 400, error, 'Can´t delete the movement'))
    }
  })
})

module.exports = router
