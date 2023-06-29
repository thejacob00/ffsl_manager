'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createTable('User', {
          id: {
            type: Sequelize.DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
          },
          username: Sequelize.DataTypes.STRING,
          email: Sequelize.DataTypes.STRING,
          password: Sequelize.DataTypes.STRING,
          is_admin: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
          },
        }, { transaction: t }),
        queryInterface.createTable('Team', {
          id: {
            type: Sequelize.DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
          },
          owner_user_id: {
            type: Sequelize.DataTypes.BIGINT,
          },
          name: Sequelize.DataTypes.STRING,
        }, { transaction: t }),
        queryInterface.createTable('Player', {
          id: {
            type: Sequelize.DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
          },
          name: Sequelize.DataTypes.STRING,
        }, { transaction: t }),
        queryInterface.createTable('Year', {
          id: {
            type: Sequelize.DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
          },
          name: Sequelize.DataTypes.STRING,
        }, { transaction: t }),
        queryInterface.createTable('Transaction', {
          id: {
            type: Sequelize.DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
          },
          is_finalized: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
          },
          description: Sequelize.DataTypes.STRING,
        }, { transaction: t }),
        queryInterface.createTable('TransactionItem', {
          id: {
            type: Sequelize.DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
          },
          transaction_id: {
            type: Sequelize.DataTypes.BIGINT,
          },
          team_id: {
            type: Sequelize.DataTypes.BIGINT,
          },
          player_id: {
            type: Sequelize.DataTypes.BIGINT,
          },
          add_to_roster: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: true,
          },
          post_season_only: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
          },
          remove_from_roster: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: true,
          },
          franchise_tag: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: true,
          },
          multi_year_deal: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: true,
          },
          year_id: {
            type: Sequelize.DataTypes.BIGINT,
          },
          money: {
            type: Sequelize.DataTypes.BIGINT,
          },
          description: Sequelize.DataTypes.STRING,
        }, { transaction: t }),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.dropTable('User', { transaction: t }),
        queryInterface.dropTable('Team', { transaction: t }),
        queryInterface.dropTable('Player', { transaction: t }),
        queryInterface.dropTable('Year', { transaction: t }),
        queryInterface.dropTable('Transaction', { transaction: t }),
        queryInterface.dropTable('TransactionItem', { transaction: t }),
      ]);
    });
  }
};
