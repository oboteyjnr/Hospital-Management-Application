const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');
const config = require('../config/env');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
};

const findRoleByName = async (name) => {
  return Role.findOne({ name: name.toLowerCase() });
};

const createPatient = async (data) => {
  const role = await findRoleByName('patient');
  if (!role) throw new Error('Patient role not found');
  return User.create({
    ...data,
    role: role._id,
  });
};

const createAdmin = async (data) => {
  const role = await findRoleByName('admin');
  if (!role) throw new Error('Admin role not found');
  return User.create({
    ...data,
    role: role._id,
  });
};

module.exports = {
  generateToken,
  findRoleByName,
  createPatient,
  createAdmin,
};
