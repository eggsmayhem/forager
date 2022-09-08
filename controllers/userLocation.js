const PlantUser = require('../models/PlantUser')
const Plant = require('../models/Plant')
const axios = require('axios')

module.exports = {
    loadPlant: async(req, res) => {
        

    },
    loadAllPlants: async(req,res) => {

    },
    getPlant: async (req, res) => {
        const scientificName = req.body.scientificName
        const findPlant = await Plant.findOne({scientificName: scientificName})
        //if plant is already in the database
        if (findPlant) {
            await findPlant.updateOne({$push:{coordinates}})
        }
    }
}