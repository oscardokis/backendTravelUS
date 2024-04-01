'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
          "username": "jane_doe123",
          "password": "pass123",
          "email": "jane_doe123@example.com",
          "create_at": "2020-08-16"
      },
      {
          "username": "johnsmith2024",
          "password": "pass2024",
          "email": "johnsmith2024@example.com",
          "create_at": "2020-02-21"
      },
      {
          "username": "alex.brown",
          "password": "passBrown",
          "email": "alex.brown@example.com",
          "create_at": "2021-07-17"
      },
      {
          "username": "mike_walker88",
          "password": "walker88Pass",
          "email": "mike_walker88@example.com",
          "create_at": "2021-05-16"
      },
      {
          "username": "sarah.connor",
          "password": "sarahCon2024",
          "email": "sarah.connor@example.com",
          "create_at": "2021-04-02"
      },
      {
          "username": "chris.jameson",
          "password": "chrisJame2024",
          "email": "chris.jameson@example.com",
          "create_at": "2020-10-12"
      },
      {
          "username": "laura_stone",
          "password": "lauraStonePass",
          "email": "laura_stone@example.com",
          "create_at": "2020-07-28"
      },
      {
          "username": "daniel.morris",
          "password": "danielMor2024",
          "email": "daniel.morris@example.com",
          "create_at": "2020-06-27"
      },
      {
          "username": "emma.wilson",
          "password": "emmaWils2024",
          "email": "emma.wilson@example.com",
          "create_at": "2022-05-14"
      },
      {
          "username": "nathan.drake",
          "password": "nateDrake2024",
          "email": "nathan.drake@example.com",
          "create_at": "2020-03-06"
      }
  ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  }

};
