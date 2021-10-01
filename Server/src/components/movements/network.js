const express = require('express')
const router = express.Router()
const controller = require('./controller')
const response = require('../responses')

router.get('/', async (req, res) => {
  controller.getAll()
    .then(message => response.success(req, res, 200, message))
    .catch(error => response.error(req, res, 404, error, 'Can´t get movements'))
})

module.exports = router
