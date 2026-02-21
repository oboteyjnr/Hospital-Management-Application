const Role = require('../models/Role');

const getAll = async () => {
  return Role.find().sort({ name: 1 }).lean();
};

const findById = async (id) => {
  return Role.findById(id);
};

const findByName = async (name) => {
  return Role.findOne({ name: name.toLowerCase() });
};

const create = async (data) => {
  return Role.create(data);
};

module.exports = {
  getAll,
  findById,
  findByName,
  create,
};
