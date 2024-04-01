'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('comment', [
        {
            "title_journey": "Nature Walk",
            "type_journey": "Nature Hike",
            "location_journey": "New York, NY",
            "description_journey": "Immerse yourself in the world of art with visits to renowned galleries and exclusive exhibitions.",
            "user_id": 4,
            "create_at": "2024-03-31"
        },
        {
            "title_journey": "Art Discovery",
            "type_journey": "Art Gallery Visiting",
            "location_journey": "San Francisco, CA",
            "description_journey": "Engage with the marvels of science and technology at leading museums and interactive workshops.",
            "user_id": 5,
            "create_at": "2024-03-31"
        },
        {
            "title_journey": "Nature Walk",
            "type_journey": "Science Museum Visit",
            "location_journey": "Chicago, IL",
            "description_journey": "Explore the wonders of nature with a guided hike through breathtaking landscapes and scenic views.",
            "user_id": 6,
            "create_at": "2024-03-31"
        },
        {
            "title_journey": "Nature Walk",
            "type_journey": "Nature Hike",
            "location_journey": "Los Angeles, CA",
            "description_journey": "Immerse yourself in the world of art with visits to renowned galleries and exclusive exhibitions.",
            "user_id": 7,
            "create_at": "2024-03-31"
        },
        {
            "title_journey": "Science Expedition",
            "type_journey": "Science Museum Visit",
            "location_journey": "San Francisco, CA",
            "description_journey": "Engage with the marvels of science and technology at leading museums and interactive workshops.",
            "user_id": 8,
            "create_at": "2024-03-31"
        },
        {
            "title_journey": "Art Discovery",
            "type_journey": "Science Museum Visit",
            "location_journey": "Chicago, IL",
            "description_journey": "Immerse yourself in the world of art with visits to renowned galleries and exclusive exhibitions.",
            "user_id": 9,
            "create_at": "2024-03-31"
        },
        {
            "title_journey": "Food and Wine Tasting",
            "type_journey": "Science Museum Visit",
            "location_journey": "New York, NY",
            "description_journey": "Explore the wonders of nature with a guided hike through breathtaking landscapes and scenic views.",
            "user_id": 10,
            "create_at": "2024-03-31"
        },
        {
            "title_journey": "Art Discovery",
            "type_journey": "Culinary Exploration",
            "location_journey": "New York, NY",
            "description_journey": "Step back in time and discover the rich history of the city with a tour of its most iconic landmarks.",
            "user_id": 11,
            "create_at": "2024-03-31"
        },
        {
            "title_journey": "Art Discovery",
            "type_journey": "Art Gallery Visiting",
            "location_journey": "New York, NY",
            "description_journey": "Explore the wonders of nature with a guided hike through breathtaking landscapes and scenic views.",
            "user_id": 12,
            "create_at": "2024-03-31"
        },
        {
            "title_journey": "Nature Walk",
            "type_journey": "Culinary Exploration",
            "location_journey": "San Francisco, CA",
            "description_journey": "Step back in time and discover the rich history of the city with a tour of its most iconic landmarks.",
            "user_id": 13,
            "create_at": "2024-03-31"
        }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('comment', null, {});
  }

};