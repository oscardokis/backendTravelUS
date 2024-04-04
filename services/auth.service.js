const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { config } = require('../config');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const UserService = require('./user.service');
const service = new UserService();

class AuthService {
  constructor() {
    this.authenticated = false;
  }

  async getUser(username, password) {
    const user = await service.findByUserName(username);
    if (!user) {
      throw boom.unauthorized('User not found');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw boom.unauthorized('Invalid password');
    }
    delete user.dataValues.password;
    return user;
  }

  async signToken(username) {
    const payload = {
      sub: username.id
    };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15s' });
    return { username, token };
  }
  
  async validateToken(token) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const username = await service.findOne(payload.sub);
      const id = payload.sub;
      return { id, username };
    } catch (error) {
      throw boom.unauthorized();
    }
  }
  async senMail(infoEmail) {
    const transporter = nodemailer.createTransport({
      host: config.emailHost,
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: config.email,
        pass: config.emailPassword,
        },
      });
    await transporter.sendMail(infoEmail);
    return {message : 'Email sent'};

  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized('User not found');
    }
    const payload = {sub: user.id , };
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
    const link = `http://myfrontend.com/recovery?token=${token}`
    await service.update(user.id, {recoveryToken: token});
    const emailInfo ={
      from: config.email, // sender address
      to: user.email, // list of receivers
      subject: "Recovery Password Email", // Subject line
      text: "test2", // plain text body
      html: `<b>Recovery Password in this link =>  ${link}</b>`, // html body
    }
    const response = await this.senMail(emailInfo);
    return response;
  }
  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);
      if(user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, {password: hash, recoveryToken: null});
      return {message: 'Password changed'};
    } catch (error) {
      throw boom.unauthorized();
    }
  }


  isAuthenticated() {

    return this.authenticated;
  }
}
module.exports = AuthService;