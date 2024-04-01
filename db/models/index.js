const { User, UserSchema } = require('./user.model');
const { Comment, CommentSchema } = require('./comment.model');
const { MyTrips, MyTripsSchema } = require('./my-trips.model');
const { ThingsToDo, ThingsToDoSchema } = require('./things-todo.model');


function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Comment.init(CommentSchema, Comment.config(sequelize));
  MyTrips.init(MyTripsSchema, MyTrips.config(sequelize));
  ThingsToDo.init(ThingsToDoSchema, ThingsToDo.config(sequelize));

  Comment.associate(sequelize.models);
  MyTrips.associate(sequelize.models);
  ThingsToDo.associate(sequelize.models);
  User.associate(sequelize.models);
}

module.exports = { setupModels };
