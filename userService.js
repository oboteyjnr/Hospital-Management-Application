const User = require('../models/User');

const getAll = async (filters = {}) => {
  const query = User.find(filters).populate('role', 'name').select('-password').sort({ createdAt: -1 });
  return query.lean();
};

const findById = async (id) => {
  return User.findById(id).populate('role', 'name').select('-password');
};

const findByEmail = async (email) => {
  return User.findOne({ email: email.toLowerCase() }).select('+password').populate('role', 'name');
};

const create = async (data) => {
  return User.create(data);
};

const update = async (id, data) => {
  return User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  })
    .populate('role', 'name')
    .select('-password');
};

const remove = async (id) => {
  return User.findByIdAndDelete(id);
};

module.exports = {
  getAll,
  findById,
  findByEmail,
  create,
  update,
  remove,
};
