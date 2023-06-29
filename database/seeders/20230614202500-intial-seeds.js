module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('User', [{
          id: 1,
          username: 'John Henry',
          email: 'one@unknown.com',
          password: '*2470C0C06DEE42FD1618BB99005ADCA2EC9D1E19',
        }], { transaction: t }),
        queryInterface.bulkInsert('User', [{
          id: 2,
          username: 'Kyle Bowman',
          email: 'one@unknown.com',
          password: '*2470C0C06DEE42FD1618BB99005ADCA2EC9D1E19',
        }], { transaction: t }),
        queryInterface.bulkInsert('User', [{
          id: 3,
          username: 'Colby Heckman',
          email: 'one@unknown.com',
          password: '*2470C0C06DEE42FD1618BB99005ADCA2EC9D1E19',
        }], { transaction: t }),
        queryInterface.bulkInsert('User', [{
          id: 4,
          username: 'Vinny Civarelli',
          email: 'one@unknown.com',
          password: '*2470C0C06DEE42FD1618BB99005ADCA2EC9D1E19',
        }], { transaction: t }),
        queryInterface.bulkInsert('User', [{
          id: 5,
          username: 'Jason Womble',
          email: 'one@unknown.com',
          password: '*2470C0C06DEE42FD1618BB99005ADCA2EC9D1E19',
        }], { transaction: t }),
        queryInterface.bulkInsert('User', [{
          id: 6,
          username: 'Nick Vitalo',
          email: 'one@unknown.com',
          password: '*2470C0C06DEE42FD1618BB99005ADCA2EC9D1E19',
        }], { transaction: t }),
        queryInterface.bulkInsert('User', [{
          id: 7,
          username: 'Josh Knight',
          email: 'one@unknown.com',
          password: '*2470C0C06DEE42FD1618BB99005ADCA2EC9D1E19',
        }], { transaction: t }),
        queryInterface.bulkInsert('User', [{
          id: 8,
          username: 'Jesse Marilla',
          email: 'one@unknown.com',
          password: '*2470C0C06DEE42FD1618BB99005ADCA2EC9D1E19',
        }], { transaction: t }),
        queryInterface.bulkInsert('User', [{
          id: 9,
          username: 'Jonathan Phelps',
          email: 'one@unknown.com',
          password: '*2470C0C06DEE42FD1618BB99005ADCA2EC9D1E19',
        }], { transaction: t }),
        queryInterface.bulkInsert('User', [{
          id: 10,
          username: 'Evan Platt',
          email: 'one@unknown.com',
          password: '*2470C0C06DEE42FD1618BB99005ADCA2EC9D1E19',
        }], { transaction: t }),
        queryInterface.bulkInsert('User', [{
          id: 11,
          username: 'Jacob Simmons',
          email: 'one@unknown.com',
          password: '*2470C0C06DEE42FD1618BB99005ADCA2EC9D1E19',
          is_admin: true,
        }], { transaction: t }),
        queryInterface.bulkInsert('User', [{
          id: 12,
          username: 'Chris Thomas',
          email: 'one@unknown.com',
          password: '*2470C0C06DEE42FD1618BB99005ADCA2EC9D1E19',
        }], { transaction: t }),
        queryInterface.bulkInsert('Team', [{
          id: 1,
          owner_user_id: 1,
          name: 'Team John Henry',
        }], { transaction: t }),
        queryInterface.bulkInsert('Team', [{
          id: 2,
          owner_user_id: 2,
          name: 'Team Kyle Bowman',
        }], { transaction: t }),
        queryInterface.bulkInsert('Team', [{
          id: 3,
          owner_user_id: 3,
          name: 'Team Colby Heckman',
        }], { transaction: t }),
        queryInterface.bulkInsert('Team', [{
          id: 4,
          owner_user_id: 4,
          name: 'Team Vinny Civarelli',
        }], { transaction: t }),
        queryInterface.bulkInsert('Team', [{
          id: 5,
          owner_user_id: 5,
          name: 'Team Jason Womble',
        }], { transaction: t }),
        queryInterface.bulkInsert('Team', [{
          id: 6,
          owner_user_id: 6,
          name: 'Team Nick Vitalo',
        }], { transaction: t }),
        queryInterface.bulkInsert('Team', [{
          id: 7,
          owner_user_id: 7,
          name: 'Team Josh Knight',
        }], { transaction: t }),
        queryInterface.bulkInsert('Team', [{
          id: 8,
          owner_user_id: 8,
          name: 'Team Jesse Marilla',
        }], { transaction: t }),
        queryInterface.bulkInsert('Team', [{
          id: 9,
          owner_user_id: 9,
          name: 'Team Jonathan Phelps',
        }], { transaction: t }),
        queryInterface.bulkInsert('Team', [{
          id: 10,
          owner_user_id: 10,
          name: 'Team Evan Platt',
        }], { transaction: t }),
        queryInterface.bulkInsert('Team', [{
          id: 11,
          owner_user_id: 11,
          name: 'Team Jacob Simmons',
        }], { transaction: t }),
        queryInterface.bulkInsert('Team', [{
          id: 12,
          owner_user_id: 12,
          name: 'Team Chris Thomas',
        }], { transaction: t }),
        queryInterface.bulkInsert('Year', [{
          id: 2022,
          name: '2022',
        }], { transaction: t }),
        queryInterface.bulkInsert('Year', [{
          id: 2023,
          name: '2023',
        }], { transaction: t }),
        queryInterface.bulkInsert('Year', [{
          id: 2024,
          name: '2024',
        }], { transaction: t }),
        queryInterface.bulkInsert('Year', [{
          id: 2025,
          name: '2025',
        }], { transaction: t }),
        queryInterface.bulkInsert('Year', [{
          id: 2026,
          name: '2026',
        }], { transaction: t }),
        queryInterface.bulkInsert('Year', [{
          id: 2027,
          name: '2027',
        }], { transaction: t }),
        queryInterface.bulkInsert('Year', [{
          id: 2028,
          name: '2028',
        }], { transaction: t }),
        queryInterface.bulkInsert('Year', [{
          id: 2029,
          name: '2029',
        }], { transaction: t }),
        queryInterface.bulkInsert('Year', [{
          id: 2030,
          name: '2030',
        }], { transaction: t }),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkDelete('User', null, { transaction: t }),
        queryInterface.bulkDelete('Team', null, { transaction: t }),
        queryInterface.bulkDelete('Player', null, { transaction: t }),
        queryInterface.bulkDelete('Year', null, { transaction: t }),
        queryInterface.bulkDelete('Transaction', null, { transaction: t }),
        queryInterface.bulkDelete('TransactionItem', null, { transaction: t }),
      ]);
    });
  }
};
