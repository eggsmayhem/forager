const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const userLocationController = require('../controllers/userLocation')



router.post('/writeUserLocation', userLocationController.getBaseLocation)

module.exports = router