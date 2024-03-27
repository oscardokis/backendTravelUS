const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model');
const COMMENT_TABLE = 'comment';

const CommentSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titleJourney: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'title_journey'
  },
  typeJourney: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'type_journey'
  },
  locationJourney: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'location_journey'
  },
  descriptionJourney: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'description_journey'

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

class Comment extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: COMMENT_TABLE,
      modelName: 'Comment',
      timestamps: false
    }
  }
}

module.exports = { COMMENT_TABLE, CommentSchema, Comment };
