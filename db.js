const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database('rgbase.db');
function createTables() {
    db.run(`
    CREATE TABLE IF NOT EXISTS rgbase(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        apellido TEXT,
        edad INTEGER,
        fecha_nacimiento DATE

    )
`);
}

module.exports = {
    db,
    createTables
}