const userService = require('../services/userService');
const authService = require('../services/authService');
const { createAuditLog } = require('../middleware/auditLog');

const register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;
    const user = await authService.createPatient({ email, password, firstName, lastName, phone });
    const token = authService.generateToken(user._id);
    const userResponse = await userService.findById(user._id);

    await createAuditLog(req, 'register', 'auth', user._id.toString(), { email: user.email });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: userResponse,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.findByEmail(email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated',
      });
    }

    const token = authService.generateToken(user._id);
    const userResponse = await userService.findById(user._id);

    await createAuditLog(req, 'login', 'auth', user._id.toString(), { email: user.email });

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: userResponse,
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await userService.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getMe };
