const express = require("express");
const router = express.Router();
const { users, getNextID, saveWeather, weather, isDateExists } = require('../utils/storeData.js')

/*-------ENDPOINTOK-------*/

//Get ALL WEATHER
router.get('/', (_req, res) => {
    res.send(weather)
})

//GET ALL WEATHER by USER ID

router.get('/:userId', (req, res) => {
    let id = req.params.userId;
    let datas = [];
    weather.forEach(day => {
        if (day.userId == id) {
            datas.push(day);
        }
    })
    if (datas.length == 0) {
        return res.status(400).send({ title: "Hiba", message: 'Nincs ilyen felhasználó', type: "warning" })
    } else {
        return res.send(datas);
    }
})

//POST NEW WEATHER

router.post('/', (req, res) => {
    let data = req.body;
    data.id = getNextID("weather")
    if (isDateExists(data.date, data.userId)) {
        return res.status(400).send({ title: "Figyelmeztetés!", message: 'Erre a dátumra már van regisztrált napod!', type: "warning" })
    }
    weather.push(data)
    saveWeather()
    res.send({ title: "Feltöltés!", message: 'Sikeres adatfeltöltést hajtottál végre!', type: "success" })
});

//DELETE WEATHER BY ID

router.delete('/:weatherId', (req, res) => {
    let index = req.params.weatherId;

    let idx = weather.findIndex(day => day.id == index);
    if (idx > -1) {
        weather.splice(idx, 1);
        saveWeather()
        return res.send({ title: "Törlés!", message: 'Az időjárás adat sikeresen törölve!', type: 'success' });
    }
    return res.status(400).send({ title: 'Hiba!', message: 'Nincs ilyen azonosítójú időjárás', type: 'danger' })
})

/*--------EXPORT--------*/

module.exports = router