#!/usr/local/bin/node

const fs = require('fs');
const readline = require('readline');
const events = require('events');
require('dotenv').config();
const pool = require('../helpers/database');
const transaction = require('../models/transaction');

const debug = true;

const team_id_lookup = {};
get_team_id_by_owner_name = async (owner_name) => {
  if (team_id_lookup[owner_name]) {
    return team_id_lookup[owner_name];
  }
  const sqlQuery = 'SELECT t.id FROM User u JOIN Team t ON u.id=t.owner_user_id WHERE username=?'
  const rows = await pool.query(sqlQuery, owner_name);
  team_id_lookup[owner_name] = rows[0].id;
  return team_id_lookup[owner_name];
};

insert_player = async (player_name) => {
  const sqlQuery = 'INSERT INTO Player (name) VALUES (?)';
  const rows = await pool.query(sqlQuery, player_name);
  return rows.insertId;
};

fix_boolean = (text) => {
  switch (text.trim().toLowerCase()) {
    case "yes":
    case "true":
      return true;
  }
  return false;
};

fix_number = (text) => {
  let ret = parseFloat(text.replaceAll(/[^0-9\.-]/g, ''));
  if (isNaN(ret)) {
    console.log('Unable to parse number: ' + number);
    exit();
  }
  return ret;
};

plus_ten_percent = (number) => {
  let increase = number * 0.1;
  if (Math.floor(increase) !== increase) {
    increase = Math.floor(increase) + 1;
  }
  if (increase < 3) {
    increase = 3;
  }
  return number + increase;
};

main = async () => {
  const rl = readline.createInterface({
    input: fs.createReadStream('./import.tsv'),
    crlfDelay: Infinity,
  });
  const endPromise = events.once(rl, 'close');
  let line_count = 0;
  let lines_complete = 0;
  rl.on('line', async (line) => {
    line_count++;
    const data = line.split('\t');
    const owner_name = data[0];
    const contract_type = data[1];
    const player_name = data[2];
    const cap_figure = fix_number(data[3]);
    const on_roster = fix_boolean(data[4]);
    const money_owed = fix_number(data[5]);
    const date = data[6];
    const description = data[7];
    const team_id = await get_team_id_by_owner_name(owner_name);
    const player_id = await insert_player(player_name);
    const transaction_id = await transaction.create_transaction('Initial Seeds: "' + player_name + '" - ' + description);
    switch (contract_type) {
//transaction.create_transaction_item = async (transaction_id, team_id, player_id, year_id, add_to_roster, post_season_only, remove_from_roster, franchise_tag, multi_year_deal, money) => {
      case 'Pink':
        await transaction.create_transaction_item(transaction_id, team_id, player_id, 2022, true, false, null, false, false, money_owed);
        await transaction.create_transaction_item(transaction_id, team_id, player_id, 2022, null, true, true, false, false, 0);
        break;
      case 'N/A':
      case 'Neon':
      case 'Purple':
        await transaction.create_transaction_item(transaction_id, team_id, player_id, 2022, on_roster || null, contract_type === 'Purple', null, false, false, money_owed);
        break;
      case 'Yellow':
        await transaction.create_transaction_item(transaction_id, team_id, player_id, 2022, on_roster || null, false, null, true, false, money_owed);
        break;
      case 'Orange':
        await transaction.create_transaction_item(transaction_id, team_id, player_id, 2022, on_roster || null, false, null, false, false, money_owed);
        await transaction.create_transaction_item(transaction_id, team_id, player_id, 2023, on_roster || null, false, null, false, true, plus_ten_percent(cap_figure));
        await transaction.create_transaction_item(transaction_id, team_id, player_id, 2024, on_roster || null, false, null, false, true, plus_ten_percent(plus_ten_percent(cap_figure)));
        break;
      case 'Blue':
        await transaction.create_transaction_item(transaction_id, team_id, player_id, 2022, on_roster || null, false, null, false, true, money_owed);
        await transaction.create_transaction_item(transaction_id, team_id, player_id, 2023, on_roster || null, false, null, false, true, plus_ten_percent(money_owed));
        break;
      case 'Forest':
        await transaction.create_transaction_item(transaction_id, team_id, player_id, 2022, on_roster || null, false, null, false, true, money_owed);
        break;
      default:
        console.log('Unkown contract type: ' + contract_type);
        exit();
    }
    if (cap_figure !== money_owed) {
      // I should probably queue something up here to confirm that all the caps are accounted for
    }
    if (debug) {
      //console.log(line.split('\t'));
    }
    console.log(owner_name, team_id, player_id);
    lines_complete++;
    if (line_count === lines_complete) {
      console.log('Success');
      process.exit();
    }
  });
  await endPromise;
};

main();
