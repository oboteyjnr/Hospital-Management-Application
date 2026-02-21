const doctorService = require('../services/doctorService');
const { createAuditLog } = require('../middleware/auditLog');

const getAll = async (req, res, next) => {
  try {
    const doctors = await doctorService.getAll();
    res.json({ success: true, doctors });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const doctor = await doctorService.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    res.json({ success: true, doctor });
  } catch (error) {
    next(error);
  }
};

const getByDepartment = async (req, res, next) => {
  try {
    const doctors = await doctorService.getByDepartment(req.params.departmentId);
    res.json({ success: true, doctors });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const doctor = await doctorService.create(req.body);
    await createAuditLog(req, 'create', 'doctor', doctor._id.toString(), {
      name: `${doctor.firstName} ${doctor.lastName}`,
    });
    res.status(201).json({ success: true, doctor });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const doctor = await doctorService.update(req.params.id, req.body);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    await createAuditLog(req, 'update', 'doctor', doctor._id.toString(), {
      name: `${doctor.firstName} ${doctor.lastName}`,
    });
    res.json({ success: true, doctor });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const doctor = await doctorService.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    await doctorService.remove(req.params.id);
    await createAuditLog(req, 'delete', 'doctor', req.params.id, {
      name: doctor.firstName && doctor.lastName ? `${doctor.firstName} ${doctor.lastName}` : 'Doctor',
    });
    res.json({ success: true, message: 'Doctor deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, getByDepartment, create, update, remove };
