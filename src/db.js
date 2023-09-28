const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database('rgbase.db');
function createTables() {
    db.run(`
    CREATE TABLE IF NOT EXISTS rgbase(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        producto TEXT,
        cliente TEXT,
        cantidad FLOAT,
        valor_pagado INTEGER,
        fecha_compra DATE

    )
`);
}

module.exports = {
    db,
    createTables
}