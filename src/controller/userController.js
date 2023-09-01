const { request, response } = require("express");
const { db } = require('../../db')
const { body, validationResult } = require('express-validator');

const validateUser = [
    body('nombre').notEmpty(),
    body('apellido').notEmpty(),
    body('edad').isInt({ min: 18 }),
    body('fecha_nacimiento').isISO8601(),
  ];

const getUser = async (req = request, res = response) => {
    db.all('SELECT * FROM rgbase;', (err, rgbase) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener los datos' });
            return;
        }
        res.json(rgbase)
    });
}

const getUserId = async (req = request, res = response) => {
    const idOrName = req.params.idOrName;
    db.get('SELECT * FROM rgbase WHERE id = ? OR nombre = ?',
    [idOrName, idOrName],
    (err, rgbase) => {
        if (err) {
            return res.status(500).json({ error: 'Usuario encontrado' });
          }
          if (!rgbase) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
          }
          res.json(rgbase);
        }
    );
}

const createUser = async (req = request, res = response) => {
    const { nombre, apellido, edad, fecha_nacimiento } = req.body;
    db.run('INSERT INTO rgbase (nombre, apellido, edad, fecha_nacimiento) VALUES (?, ?, ?, ?)',
        [nombre, apellido, edad, fecha_nacimiento],
        function (err) {
  
            if (err) {
                return res.status(500).json({ error: 'Error al agregar un nuevo usuario' });
            }

            return res.json({ message: 'User created', userId: this.lastID });
        }
    );
}

const updateUser = async (req = request, res = response) => {
    const userId = req.params.id;
    const {nombre, apellido, edad, fecha_nacimiento} = req.body;
    db.run('UPDATE rgbase SET nombre = ?, apellido = ?, edad = ?, fecha_nacimiento = ? WHERE id = ?',
    [nombre, apellido, edad, fecha_nacimiento, userId],
    (err) => {
        if(err){
            console.log(err);
            return res.status(500).json({error:'No se pudo actualizar el usuario'});
        }
        res.json({message:'Usuario actualizado', changes: this.changes});
    }
    );
}

const deleteUser = async (req = request, res = response) => {
    const idOrName = req.params.idOrName;
    db.run('DELETE FROM rgbase WHERE id = ? OR nombre = ?',
    [idOrName, idOrName],
    (err) => {
        if(err){
            console.log(err);
            return res.status(500).json({error: 'Error, no se pudo realizar la operacion!'});
        }
        console.log('borraste codigo', idOrName);
        res.json({message:`Usuario con ID ${idOrName} borrado`, changes: this.changes})
    }
    );
}

module.exports = {
    validateUser,
    getUser,
    getUserId,
    createUser,
    updateUser,
    deleteUser
}