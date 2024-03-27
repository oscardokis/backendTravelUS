const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(5);
const username = Joi.string().min(3);
const token = Joi.string();

const createUserSchema = Joi.object({
  username: username.required(),
  email: email.required(),
  password: password.required(),
  role: role
});

const updateUserSchema = Joi.object({
  username: username,
  email: email,
  role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

const createNewPassword = Joi.object({
  token: token.required(),
  newPassword: password.required()
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema, createNewPassword }
