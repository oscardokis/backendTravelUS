const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'user';

const UserSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING,

  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'customer',
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
};

class User extends Model {
  static associate(models) {
    this.hasMany(models.Comment, { foreignKey: 'userId', as: 'comments' });
    this.hasMany(models.MyTrips, { foreignKey: 'userId', as: 'myTrips' });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User };
