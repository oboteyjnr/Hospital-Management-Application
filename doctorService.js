const Doctor = require('../models/Doctor');

const getAll = async (filters = {}) => {
  const query = Doctor.find(filters).populate('department', 'name description').sort({ lastName: 1 });
  return query.lean();
};

const findById = async (id) => {
  return Doctor.findById(id).populate('department', 'name description');
};

const create = async (data) => {
  return Doctor.create(data);
};

const update = async (id, data) => {
  return Doctor.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).populate('department', 'name description');
};

const remove = async (id) => {
  return Doctor.findByIdAndDelete(id);
};

const getByDepartment = async (departmentId) => {
  return Doctor.find({ department: departmentId, isActive: true })
    .populate('department', 'name')
    .lean();
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
  getByDepartment,
};
