const { request, response } = require("express");
const { db } = require('../../db')

const getUser = async (req = request, res = response) => {
    db.all('SELECT * FROM rgbase;', (err, rgbase) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener los datos' });
            return;
        }
        res.json(rgbase)
    });
}


module.exports = {
    getUser
}