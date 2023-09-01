const { request, response } = require('express');
const { db } = require('../../db');

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


module.exports = {
    getUserId
}
