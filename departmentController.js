const departmentService = require('../services/departmentService');
const { createAuditLog } = require('../middleware/auditLog');

const getAll = async (req, res, next) => {
  try {
    const departments = await departmentService.getAll();
    res.json({ success: true, departments });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const department = await departmentService.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ success: false, message: 'Department not found' });
    }
    res.json({ success: true, department });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const department = await departmentService.create(req.body);
    await createAuditLog(req, 'create', 'department', department._id.toString(), {
      name: department.name,
    });
    res.status(201).json({ success: true, department });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const department = await departmentService.update(req.params.id, req.body);
    if (!department) {
      return res.status(404).json({ success: false, message: 'Department not found' });
    }
    await createAuditLog(req, 'update', 'department', department._id.toString(), {
      name: department.name,
    });
    res.json({ success: true, department });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const department = await departmentService.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ success: false, message: 'Department not found' });
    }
    await departmentService.remove(req.params.id);
    await createAuditLog(req, 'delete', 'department', req.params.id, {
      name: department.name,
    });
    res.json({ success: true, message: 'Department deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, create, update, remove };
