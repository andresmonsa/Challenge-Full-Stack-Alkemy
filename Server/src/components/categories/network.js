const express = require('express')
const router = express.Router()
const controller = require('./controller')
const response = require('../responses')

router.get('/', async (req, res) => {
  controller.getAll()
    .then(message => response.success(req, res, 200, message))
    .catch(error => response.error(req, res, 404, error, 'Can´t get categories'))
})

router.post('/', async (req, res) => {
  controller.addCat(req.body.name)
    .then(message => response.success(req, res, 200, message))
    .catch(error => response.error(req, res, 400, error, 'Can´t create the category'))
})
module.exports = router
