const express = require("express");
const router = express.Router();
const { users, getNextID, isEmailExists, saveUsers } = require('../utils/storeData.js')

//GET ALL USER (Összes felhasználó lekérése)
router.get('/', (_req, res) => {
    res.send(users)
})

//GET ONE USER (Egy felhasználó lekérése ID alapján)

router.get('/:id', (req, res) => {
    let id = req.params.id;
    let idx = users.findIndex(user => user.id == id);
    if (idx > -1) {
        return res.send(users[idx])
    }
    return res.status(400).send({ title: "Hiba", message: 'Nincs ilyen felhasználó', type: "warning" })
})

//POST LOGGED USER (Bejelentkezés)

router.post('/login', (req, res) => {
    let { email, password } = req.body;
    let loggedUser = {};
    users.forEach(user => {
        if (user.email == email && user.password == password) {
            loggedUser = user;
            return
        }
    })

    return res.send(loggedUser);
})

//POST NEW USER (Felhasználó regisztrálása)

router.post('/', (req, res) => {
    let data = req.body;
    if (isEmailExists(data.email)) {
        return res.status(400).send({ title: "Figyelmeztetés!", message: 'Ez az e-mail cím már regisztrált!', type: "warning" })
    }
    data.id = getNextID("user")
    users.push(data)
    saveUsers()
    res.send({ title: "Regisztráció!", message: 'A felhasználó sikeresen regisztált!', type: "success" })
});

//PATCH USER DATA(Felhasználói adatok módosítása)

router.patch("/profile", (req, res) => {
    const { id, name, email } = req.body;
    let idx = users.findIndex(user => user.email == email && user.id != id);
    if (idx > -1) {
        return res.status(400).send({ title: "Figyelmeztetés!", message: "Ez az e-mail cím már foglalt!", type: "warning" })
    }

    idx = users.findIndex(user => user.id == id)
    if (idx == -1) {
        return res.status(400).send({ title: "Hiba!", message: "Nem található a felhasználó", type: "danger" })
    }
    users[idx].name = name
    users[idx].email = email

    saveUsers();

    return res.status(200).send({ title: "Módosítva!", message: "A profil sikeresen módosítva!", type: "success" });
});

//PATCH USER PASSWORD (Jelszó módosítása)

router.patch("/password", (req, res) => {
    const { id, oldPassword, newPassword } = req.body;
    let idx = users.findIndex(user => user.id == id)

    if (idx == -1) {
        return res.status(400).send({ title: "Figyelmeztetés", message: "Nem található a felhasználó", type: "warning" })
    }

    if (users[idx].password != oldPassword) {
        return res.status(400).send({ title: "Hiba", message: "Megadott jelszó nem megfelelő", type: "danger" })
    }

    users[idx].password = newPassword;
    saveUsers()

    return res.send({ title: "Jelszó módosítva!", message: "A jelszó sikeresen módosítva", type: "success" })
})

/*--------EXPORT--------*/

module.exports = router