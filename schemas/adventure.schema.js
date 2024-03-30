const Joi = require('joi');

const city = Joi.string().min(3).max(30);
const state = Joi.string().min(3).max(30);
const month = Joi.string().min(3).max(30);
const activity = Joi.string().min(3).max(30);

const createAdventureSchema = Joi.object({
  city: city.required(),
  state: state.required(),
  month: month.required(),
  activity: activity.required(),
});



module.exports = { createAdventureSchema }
