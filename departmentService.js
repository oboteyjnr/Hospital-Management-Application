const Department = require('../models/Department');

const getAll = async (filters = {}) => {
  const query = Department.find(filters).sort({ name: 1 });
  return query.lean();
};

const findById = async (id) => {
  return Department.findById(id);
};

const create = async (data) => {
  return Department.create(data);
};

const update = async (id, data) => {
  return Department.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const remove = async (id) => {
  return Department.findByIdAndDelete(id);
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};
