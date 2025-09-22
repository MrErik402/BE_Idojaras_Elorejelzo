const express = require("express");
const router = express.Router();
const {users, getNextID, saveWeather, weather} = require('../utils/storeData.js')

//Get ALL WEATHER
router.get('/', (_req,res)=>{
    res.send(users)
})

//POST NEW WEATHER


/*--------EXPORT--------*/

module.exports = router