'use strict';

const { UserSchema, USER_TABLE } = require('../models/user.model');
const { MyTripsSchema, MY_TRIPS_TABLE } = require('../models/my-trips.model');
const { CommentSchema, COMMENT_TABLE } = require('../models/comment.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(MY_TRIPS_TABLE, MyTripsSchema);
    await queryInterface.createTable(COMMENT_TABLE, CommentSchema);
  },
  async down (queryInterface) {
    await queryInterface.dropTable(MY_TRIPS_TABLE);
    await queryInterface.dropTable(COMMENT_TABLE);
    await queryInterface.dropTable(USER_TABLE);
  }
};
