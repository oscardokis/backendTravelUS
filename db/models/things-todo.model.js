const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model');
const { MY_TRIPS_TABLE } = require('./my-trips.model');
const THINGS_TODO_TABLE = 'things_todo';

const ThingsToDoSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  activity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accessories: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  funFact: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'fun_fact'
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
    references: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  myTripId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'my_trip_id',
    references: {
      model: MY_TRIPS_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
};

class ThingsToDo extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    this.belongsTo(models.MyTrips, { foreignKey: 'myTripId', as: 'myTrip' });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: THINGS_TODO_TABLE,
      modelName: 'ThingsToDo',
      timestamps: false
    }
  }
}

module.exports = { THINGS_TODO_TABLE, ThingsToDoSchema, ThingsToDo };