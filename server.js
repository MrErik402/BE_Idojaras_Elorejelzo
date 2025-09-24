const express = require('express')
var cors = require('cors')

//Modulok behúzása

const userRoutes = require("./modules/users.js")
const weatherRoutes = require("./modules/weather.js")
const app = express()

//Middlewarek
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Endpointok

app.get('/', (_req, res) => {
    res.send('Backend API by Bajai SZC Türr István Technikum - 13.A Szoftverfejlesztő')
})

app.use("/users", userRoutes);
app.use("/weather", weatherRoutes);

app.listen(3000, () => {
    console.log('Server listening on http://localhost:3000')
});