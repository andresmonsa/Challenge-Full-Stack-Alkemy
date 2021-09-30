const express = require('express')
const router = express.Router()

const movements = require('../components/movements/network.js')
const users = require('../components/users/network.js')
const categories = require('../components/categories/network.js')

router.use('/movements', movements)
router.use('/users', users)
router.use('/categories', categories)

module.exports = router
