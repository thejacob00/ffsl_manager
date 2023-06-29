const pool = require('../helpers/database');

const current_year = '2022';
const primary_sql = `
  SELECT te.name as team, te.id as team_id, p.name as player, y.name as year, ti.money,
    ti.add_to_roster, ti.post_season_only, ti.remove_from_roster, ti.franchise_tag, ti.multi_year_deal
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

const roster = {};

roster.getRoster = async (id) => {
  const sql_query = primary_sql + ' AND te.id=?';
  const rows = await pool.query(sql_query, [true, id]);
  return Object.values(group_by_team(rows))[0];
};

roster.getAllRosters = async () => {
  const rows = await pool.query(primary_sql, [true]);
  return Object.values(group_by_team(rows));
};

group_by_team = (records) => {
  const teams = {};
  for (const row of records) {
    if (!teams[row.team]) {
      teams[row.team] = {};
      teams[row.team].id = row.team_id;
      teams[row.team].name = row.team;
      teams[row.team].players = [];
    }
    teams[row.team].players.push(row);
  }
  for (const team of Object.values(teams)) {
    teams[team.name] = post_process_team(team);
  }
  return teams;
};

post_process_team = (team) => {
  team.players = group_by_player(team.players);
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
  return Object.values(ret).filter((player) => {
    return player[current_year] > 0;
  });
};

post_process_player = (records) => {
  const ret = {};
  let add_to_roster_count = 0;
  let post_season_add_to_roster_count = 0;
  for (const record of records) {
    ret.player = record.player;
    if (record.add_to_roster) {
      if (!record.post_season_only) {
        add_to_roster_count++;
      }
      post_season_add_to_roster_count++;
    }
    if (record.remove_from_roster) {
      if (!record.post_season_only) {
        add_to_roster_count--;
      }
      post_season_add_to_roster_count--;
    }
    ret[record.year] ??= 0;
    ret[record.year] += record.money;
    if (record.year === current_year) {
      ret.is_franchised ||= record.franchise_tag;
      ret.multi_year_deal ||= record.multi_year_deal;
    }
  };
  ret.on_roster = post_season_add_to_roster_count > 0;
  ret.post_season_only = add_to_roster_count !== post_season_add_to_roster_count;
  return ret;
};

module.exports = roster;
