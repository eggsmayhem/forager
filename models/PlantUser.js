const mongoose = require('mongoose')

const PlantUserSchema = new mongoose.Schema({
    baseLocation: {
        type: String,
    },
    currentLocation: {
        type: String,
    },
    plants: {
        type: Array
    }
    
})

module.exports = mongoose.model('PlantUser', PlantUserSchema)
