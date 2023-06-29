const express = require('express');
const pool = require('../helpers/database');
const roster = require('../models/roster');
const transaction = require('../models/transaction');
const router = express.Router();

const current_year = '2022';

router.post('/end_post_season', async (req, res) => {
  const teams = await roster.getAllRosters();
  const transaction_id = await transaction.create_transaction('End Post Season for Year: "' + current_year + '"');
  const sqlQuery = 'INSERT INTO TransactionItem (transaction_id, team_id, player_id, year_id, add_to_roster, post_season_only, remove_from_roster, money) SELECT ?, team_id, player_id, year_id, remove_from_roster, post_season_only, add_to_roster, money * -1 FROM TransactionItem WHERE year_id=? AND post_season_only=?';
  await pool.query(sqlQuery, [transaction_id, current_year, true]);
  res.status(200).json({});
});

module.exports = router;
