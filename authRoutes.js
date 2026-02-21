const express = require('express');
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { registerValidation, loginValidation } = require('../validators/authValidators');

const router = express.Router();

router.all('/login', (req, res, next) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Use POST method with JSON body: {"email":"...","password":"..."}' });
  }
  next();
});
router.all('/register', (req, res, next) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Use POST method with JSON body' });
  }
  next();
});

router.post('/register', registerValidation, validate, authController.register);
router.post('/login', loginValidation, validate, authController.login);
router.get('/me', authenticate, authController.getMe);

module.exports = router;
