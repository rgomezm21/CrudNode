
const { request, response } = require('express');
const { db } = require('../../db');

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
    deleteUser
}