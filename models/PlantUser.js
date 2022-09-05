const mongoose = require('mongoose')

const PlantUserSchema = new mongoose.Schema({
    baseLocation: {
        type: String,
    },
    currentLocation: {

    },
})

module.exports = mongoose.model('PlantUser', PlantUserSchema)
