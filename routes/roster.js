const express = require('express');
const pool = require('../helpers/database');
const router = express.Router();

const current_year = '2022';
const primary_sql = `
  SELECT te.name as team, p.name as player, y.name as year, ti.money
  FROM Transaction t
  JOIN TransactionItem ti
    ON t.id=ti.transaction_id
  JOIN Team te
    ON te.id=ti.team_id
  JOIN Player p
    ON p.id=ti.player_id
  JOIN Year y
    ON y.id=ti.year_id
  WHERE t.is_finalized=?
`;

router.get('/:id', async (req, res) => {
  const sql_query = primary_sql + ' AND te.id=?';
  const rows = await pool.query(sql_query, [true, req.params.id]);
  res.status(200).json(post_process_team(rows));
});

router.get('/', async (req, res) => {
  const rows = await pool.query(primary_sql, [true]);
  res.status(200).json(group_by_team(rows));
/*
  if (rows.length > 0) {
    res.status(200).json(rows[0]);
  }
  else {
    res.status(404);
  }
*/
});

group_by_team = (records) => {
  const teams = {};
  for (const row of records) {
    if (!teams[row.team]) {
      teams[row.team] = [];
    }
    teams[row.team].push(row);
  }
  const ret = {};
  for (const team of Object.keys(teams)) {
    ret[team] = post_process_team(teams[team]);
  }
  return ret;
};

post_process_team = (records) => {
  const team = {
    players: Object.values(group_by_player(records)),
  };
  team.cap_space = team.players.reduce((sum, player) => {
    return sum + (player[current_year] ?? 0);
  }, 0);
  return team;
};

group_by_player = (records) => {
  const players = {};
  for (const row of records) {
    if (!players[row.player]) {
      players[row.player] = [];
    }
    players[row.player].push(row);
  }
  const ret = {};
  for (const player of Object.keys(players)) {
    ret[player] = post_process_player(players[player]);
  }
  return ret;
};

post_process_player = (records) => {
  const ret = {};
  for (const record of records) {
    ret.player = record.player;
    ret[record.year] = record.money;
  };
  return ret;
};

module.exports = router;
