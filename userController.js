const userService = require('../services/userService');
const authService = require('../services/authService');
const { createAuditLog } = require('../middleware/auditLog');

const getAll = async (req, res, next) => {
  try {
    const users = await userService.getAll();
    res.json({ success: true, users });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const user = await userService.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { roleName, ...data } = req.body;
    let user;
    if (roleName === 'admin') {
      user = await authService.createAdmin(data);
    } else {
      user = await authService.createPatient(data);
    }
    const userResponse = await userService.findById(user._id);
    await createAuditLog(req, 'create', 'user', user._id.toString(), { email: user.email });
    res.status(201).json({ success: true, user: userResponse });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const updateData = { ...req.body };
    if (updateData.password && updateData.password.length >= 6) {
      // Password will be hashed by User model pre-save
    } else {
      delete updateData.password;
    }
    const user = await userService.update(req.params.id, updateData);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    await createAuditLog(req, 'update', 'user', user._id.toString(), { email: user.email });
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const user = await userService.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    await userService.remove(req.params.id);
    await createAuditLog(req, 'delete', 'user', req.params.id, { email: user.email });
    res.json({ success: true, message: 'User deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, create, update, remove };
