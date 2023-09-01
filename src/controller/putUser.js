const { request, response } = require('express');
const { db } = require('../../db');

const putUser = async (req = request, res = response) => {
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

module.exports = {
    putUser
}