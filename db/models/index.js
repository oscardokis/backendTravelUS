const { User, UserSchema } = require('./user.model');
const { Comment, CommentSchema } = require('./comment.model');
const { MyTrips, MyTripsSchema } = require('./my-trips.model');


function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Comment.init(CommentSchema, Comment.config(sequelize));
  MyTrips.init(MyTripsSchema, MyTrips.config(sequelize));

  Comment.associate(sequelize.models);
  MyTrips.associate(sequelize.models);
}

module.exports = { setupModels };
