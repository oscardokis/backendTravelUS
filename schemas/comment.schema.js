const Joi = require('joi');

const titleJourney = Joi.string().min(3).max(30);
const typeJourney = Joi.string().min(3).max(30);
const locationJourney = Joi.string().min(3).max(30);
const descriptionJourney = Joi.string().min(3).max(30);

const createCommentSchema = Joi.object({
  titleJourney: titleJourney.required(),
  typeJourney: typeJourney.required(),
  locationJourney: locationJourney.required(),
  descriptionJourney: descriptionJourney.required(),
});



module.exports = { createCommentSchema }
