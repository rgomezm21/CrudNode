const { request, response } = require("express");
const { db } = require('../../db')


const postUser = async (req = request, res = response) => {
    const { nombre, apellido, edad, fecha_nacimiento } = req.body;
    console.log(nombre, apellido, edad, fecha_nacimiento);
    db.run('INSERT INTO rgbase (nombre, apellido, edad, fecha_nacimiento) VALUES (?, ?, ?, ?)',
        [nombre, apellido, edad, fecha_nacimiento],
        function (err) {
            console.log('Hola Mundo');
            if (err) {
                return res.status(500).json({ error: 'Error al agregar un nuevo usuario' });
            }

            return res.json({ message: 'User created', userId: this.lastID });
        }
    );
}

module.exports = {
    postUser
}
