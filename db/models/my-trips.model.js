const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model');
const MY_TRIPS_TABLE = 'my_trips';

const MyTripsSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  activities: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accesories: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  funFact: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'fun_fact'
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state:{
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
    unique: true,
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