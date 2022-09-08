const mongoose = require('mongoose')

const PlantSchema = new mongoose.Schema({
            coordinates: [{
                userId: {
                    type: String,
                },
                coords: {
                    lat: {
                        type: String
                    },
                    long: {
                        type: String
                    }
                }
            }],
            img: {
                type: String
            },
            commonName: {
                type: String
            },
            scientificName: {
                type: String
            }
})

module.exports = mongoose.model('Plant', PlantSchema)
