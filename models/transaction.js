const pool = require('../helpers/database');

const transaction = {};

transaction.create_transaction = async (description) => {
  const sqlQuery = 'INSERT INTO Transaction (is_finalized, description) VALUES (?, ?)';
  const rows = await pool.query(sqlQuery, [true, description]);
  return rows.insertId;
};

transaction.create_transaction_item = async (transaction_id, team_id, player_id, year_id, add_to_roster, post_season_only, remove_from_roster, franchise_tag, multi_year_deal, money) => {
  const sqlQuery = 'INSERT INTO TransactionItem (transaction_id, team_id, player_id, year_id, add_to_roster, post_season_only, remove_from_roster, franchise_tag, multi_year_deal, money) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const rows = await pool.query(sqlQuery, [transaction_id, team_id, player_id, year_id, add_to_roster, post_season_only, remove_from_roster, franchise_tag, multi_year_deal, money]);
  return rows.insertId;
};

module.exports = transaction;
