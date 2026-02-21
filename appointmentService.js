const Appointment = require('../models/Appointment');

const getAll = async (filters = {}) => {
  const query = Appointment.find(filters)
    .populate('patient', 'firstName lastName email')
    .populate('doctor', 'firstName lastName specialization')
    .populate({ path: 'doctor', populate: { path: 'department', select: 'name' } })
    .sort({ appointmentDate: 1, appointmentTime: 1 });
  return query.lean();
};

const findById = async (id) => {
  return Appointment.findById(id)
    .populate('patient', 'firstName lastName email')
    .populate('doctor', 'firstName lastName specialization contactEmail contactPhone')
    .populate({ path: 'doctor', populate: { path: 'department', select: 'name description' } });
};

const create = async (data) => {
  return Appointment.create(data);
};

const update = async (id, data) => {
  return Appointment.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  })
    .populate('patient', 'firstName lastName email')
    .populate('doctor', 'firstName lastName specialization')
    .populate({ path: 'doctor', populate: { path: 'department', select: 'name' } });
};

const remove = async (id) => {
  return Appointment.findByIdAndDelete(id);
};

const getByPatient = async (patientId) => {
  return Appointment.find({ patient: patientId })
    .populate('doctor', 'firstName lastName specialization')
    .populate({ path: 'doctor', populate: { path: 'department', select: 'name' } })
    .sort({ appointmentDate: -1 })
    .lean();
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
  getByPatient,
};
