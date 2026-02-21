const appointmentService = require('../services/appointmentService');
const { createAuditLog } = require('../middleware/auditLog');

const getAll = async (req, res, next) => {
  try {
    const appointments = await appointmentService.getAll();
    res.json({ success: true, appointments });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const appointment = await appointmentService.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    res.json({ success: true, appointment });
  } catch (error) {
    next(error);
  }
};

const getMyAppointments = async (req, res, next) => {
  try {
    const appointments = await appointmentService.getByPatient(req.userId);
    res.json({ success: true, appointments });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = { ...req.body, patient: req.userId };
    const appointment = await appointmentService.create(data);
    const populated = await appointmentService.findById(appointment._id);
    await createAuditLog(req, 'create', 'appointment', appointment._id.toString(), {
      patient: req.userId,
      doctor: appointment.doctor,
      date: appointment.appointmentDate,
    });
    res.status(201).json({ success: true, appointment: populated });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const existing = await appointmentService.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    if (req.userRole === 'patient' && existing.patient?._id?.toString() !== req.userId.toString()) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    const appointment = await appointmentService.update(req.params.id, req.body);
    await createAuditLog(req, 'update', 'appointment', appointment._id.toString(), {
      status: appointment.status,
    });
    res.json({ success: true, appointment });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const appointment = await appointmentService.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    if (req.userRole === 'patient' && appointment.patient?._id?.toString() !== req.userId.toString()) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    await appointmentService.remove(req.params.id);
    await createAuditLog(req, 'delete', 'appointment', req.params.id);
    res.json({ success: true, message: 'Appointment deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, getMyAppointments, create, update, remove };
