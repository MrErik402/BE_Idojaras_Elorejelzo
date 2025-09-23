const fs = require('fs');
const path = require('path');

let users = []
let weather = []
const USERS_FILE = path.join(__dirname,'..','database','users.json');
const WEATHER_FILE = path.join(__dirname,'..','database','weather.json');

function initStore(){
    loadUsers();
    loadWeather();
}

initStore()

/*----------Segéd függvények---------*/

function getNextID(type) {
    let nextID = 1
    let maxindex = 0
    switch (type) {
        case "user":
            nextID = 1;
            if (users.length === 0) {
                return nextID;
            }
            maxindex = 0;
            for (let i = 1; i < users.length; i++) {
                if (users[i].id > users[maxindex].id) {
                    maxindex = i;
                }
            }
            return users[maxindex].id + 1;

        case "weather":
            nextID = 1;
            if (weather.length === 0) {
                return nextID;
            }
            maxindex = 0;
            for (let i = 1; i < weather.length; i++) {
                if (weather[i].id > weather[maxindex].id) {
                    maxindex = i;
                }
            }
            return weather[maxindex].id + 1;
            
    }
}
function isEmailExists(email) {
    let exists = false
    users.forEach(user => {
        if (user.email == email) {
            exists = true
            return;
        }
    });
    return exists
}

function isDateExists(date, id){
    let exists = false
    weather.forEach(day => {
        if (day.date == date && day.userId == id) {
            exists = true
            return;
        }
    });
    return exists
}

/*----------Felhasználnói adatok kezelése---------*/

function loadUsers() {
    if (fs.existsSync(USERS_FILE)) {
        const rawFile = fs.readFileSync(USERS_FILE)
        try {
            users = JSON.parse(rawFile)
        } catch (err) {
            console.log("Hiba történt a felhasználó adatok beolvasása közben!")
            users = []
        }
    }
}
function saveUsers() {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users))
    loadUsers()
}

/*----------Időjárás adatok kezelése---------*/
function loadWeather() {
    if (fs.existsSync(WEATHER_FILE)) {
        const rawFile = fs.readFileSync(WEATHER_FILE)
        try {
            weather = JSON.parse(rawFile)
        } catch (err) {
            console.log("Hiba történt az időjárás adatok beolvasása közben!")
            weather = []
        }
    }
}
function saveWeather() {
    fs.writeFileSync(WEATHER_FILE, JSON.stringify(weather))
}

/*----------Modul adatok exportálása---------*/

module.exports = {
    loadUsers,
    saveUsers,
    loadWeather,
    saveWeather,
    getNextID,
    isEmailExists,
    isDateExists,
    users,
    weather
}