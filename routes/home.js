const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
// const userLocationController = require('../controllers/userLocation')

router.get('/', homeController.getIndex)

module.exports = router