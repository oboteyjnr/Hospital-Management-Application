const roleService = require('../services/roleService');

const getAll = async (req, res, next) => {
  try {
    const roles = await roleService.getAll();
    res.json({ success: true, roles });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const role = await roleService.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ success: false, message: 'Role not found' });
    }
    res.json({ success: true, role });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById };
