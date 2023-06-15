const express = require('express');
const pool = require('../helpers/database');
const router = express.Router();

router.post('', async function(req, res){
    try{
        const sqlQuery = 'SELECT first_name, last_name FROM owners WHERE username=? AND password=password(?)';
        const rows = await pool.query(sqlQuery, [req.body.username, req.body.password]);
        if (rows.length > 0) {
            res.status(200).json(rows[0]);  // Should never be more than one
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