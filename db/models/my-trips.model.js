const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model');
const MY_TRIPS_TABLE = 'my_trips';

const MyTripsSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  activity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  month: {
    type: DataTypes.STRING,
    allowNull: false,
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
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
};

class MyTrips extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    this.hasMany(models.ThingsToDo, { foreignKey: 'myTripId', as: 'thingsToDo' });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: MY_TRIPS_TABLE,
      modelName: 'MyTrips',
      timestamps: false
    }
  }
}

module.exports = { MY_TRIPS_TABLE, MyTripsSchema, MyTrips };