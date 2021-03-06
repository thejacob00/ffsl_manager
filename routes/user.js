const express = require('express');
const pool = require('../helpers/database');
const router = express.Router();

router.get('/:id', async function(req, res){
    try{
        const sqlQuery = 'SELECT first_name, last_name FROM owners WHERE id=?';
        const rows = await pool.query(sqlQuery, req.params.id);
        if (rows.length > 0) {
            res.status(200).json(rows[0]);  // Should never be more than one anyways
          }
          else {
            res.status(404);
          }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = router;