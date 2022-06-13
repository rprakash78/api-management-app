const express = require('express')
const router = express.Router()

const addUser = require('../controller/adduser')
const getUsers = require('../controller/getUsers')
const performAction = require('../controller/performAction')
const verifyHeader = require('../middleware/verifyHeader')

router.post('/user',
  addUser)

router.get('/perform', 
verifyHeader,
performAction)

router.get('/users', getUsers)

  module.exports = router
