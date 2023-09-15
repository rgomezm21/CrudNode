const { request, response } = require("express");
const { db } = require('../db')
const { validationResult } = require('express-validator');

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
    const id = req.params.id;
    db.get('SELECT * FROM rgbase WHERE id = ?',
    [id],
    (err, rgbase) => {
        if (err) {
            return res.status(500).json({ error: 'Producto encontrado' });
          }
          if (!rgbase) {
            return res.status(404).json({ message: 'Producto no encontrado' });
          }
          res.json(rgbase);
        }
    );
}

const createUser = async (req = request, res = response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: "los campos no pueden estar vacios" });
      }
    const { producto, cliente, cantidad, valor_pagado, fecha_compra } = req.body;
    db.run('INSERT INTO rgbase (producto, cliente, cantidad, valor_pagado, fecha_compra) VALUES (?, ?, ?, ?, ?)',
        [producto, cliente, cantidad, valor_pagado, fecha_compra],
        function (err) {
            if (err) {
                return res.status(500).json({ error: 'Error al agregar un nuevo producto' });
            }
            return res.json({ message: 'Product created', userId: this.lastID });
        }
    );
}

const updateUser = async (req = request, res = response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: "los campos no pueden estar vacios" });
      }
    const userId = req.params.id;
    const {producto, cliente, cantidad, valor_pagado, fecha_compra} = req.body;
    db.run('UPDATE rgbase SET producto = ?, cliente = ?, cantidad = ?, valor_pagado= ?, fecha_compra = ? WHERE id = ?',
    [producto, cliente, cantidad, valor_pagado, fecha_compra, userId],
    (err) => {
        if(err){
            console.log(err);
            return res.status(500).json({error:'No se pudo actualizar el producto'});
        }
        res.json({message:'Producto actualizado', changes: this.changes});
    }
    );
}

const deleteUser = async (req = request, res = response) => {
    const id = req.params.id;
    db.run('DELETE FROM rgbase WHERE id = ?',
    [id],
    (err) => {
        if(err){
            console.log(err);
            return res.status(500).json({error: 'Error, no se pudo realizar la operacion!'});
        }
        console.log('borraste codigo', id);
        res.json({message:`Usuario con ID ${id} borrado`, changes: this.changes})
    }
    );
}

module.exports = {
    getUser,
    getUserId,
    createUser,
    updateUser,
    deleteUser
}