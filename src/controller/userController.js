const { request, response } = require("express");
const { db } = require('../db')
const { validationResult } = require('express-validator');

const getProduct = async (req = request, res = response) => {
    db.all('SELECT * FROM rgbase;', (err, rgbase) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener los datos' });
            return;
        }
        res.json(rgbase)
    });
}

const getProductId = async (req = request, res = response) => {
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

const search = async (req, res) => {
    const search = req.params.search

    db.all(`SELECT * FROM rgbase WHERE producto like '%${search}%' or cliente like '%${search}%';`, (err, rgbase) => {
        if (err) {
            return res.status(500).json({ error: 'No se encontro registro' });
        }

        res.json(rgbase)
    })
}

const createProduct = async (req = request, res = response) => {
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


const updateProduct = async (req = request, res = response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: "los campos no pueden estar vacios" });
    }
    const userId = req.params.id;
    const { producto, cliente, cantidad, valor_pagado, fecha_compra } = req.body;
    db.run('UPDATE rgbase SET producto = ?, cliente = ?, cantidad = ?, valor_pagado= ?, fecha_compra = ? WHERE id = ?',
        [producto, cliente, cantidad, valor_pagado, fecha_compra, userId],
        (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'No se pudo actualizar el producto' });
            }
            res.json({ message: 'Producto actualizado', changes: this.changes });
        }
    );
}

const deleteProduct = async (req = request, res = response) => {
    const id = req.params.id;
    db.run('DELETE FROM rgbase WHERE id = ?',
        [id],
        (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Error, no se pudo realizar la operacion!' });
            }
            console.log('borraste codigo', id);
            res.json({ message: `Usuario con ID ${id} borrado`, changes: this.changes })
        }
    );
}


const calculateMonthlyTotals = (rgbase, year, month) => {
    const filteredData = rgbase.filter((item) => {
        const itemDate = new Date(item.fecha_compra);
        return itemDate.getFullYear() == year && itemDate.getMonth() == month - 1;
    });

    const totalQuantity = filteredData.reduce((total, item) => total + item.cantidad, 0);
    const totalAmountPaid = filteredData.reduce((total, item) => total + item.valor_pagado, 0);

    return { totalQuantity, totalAmountPaid };
};

const searchProductByMonth = async (req, res) => {
    const { year, month } = req.params;

    db.all('SELECT * FROM rgbase;', (err, rgbase) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener los datos' });
        }

        const { totalQuantity, totalAmountPaid } = calculateMonthlyTotals(rgbase, year, month);

        res.json({ totalQuantity, totalAmountPaid });
    });
};

module.exports = {
    getProduct,
    getProductId,
    createProduct,
    updateProduct,
    deleteProduct,
    search,
    searchProductByMonth
}