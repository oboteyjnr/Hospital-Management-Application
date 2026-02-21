const { param, body } = require('express-validator');
const mongoose = require('mongoose');

const mongoId = (paramName = 'id') =>
  param(paramName).isMongoId().withMessage('Invalid resource ID');

const departmentValidation = [
  body('name').trim().notEmpty().withMessage('Department name is required'),
  body('description').optional().trim(),
  body('isActive').optional().isBoolean(),
];

const doctorValidation = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('specialization').trim().notEmpty().withMessage('Specialization is required'),
  body('department')
    .notEmpty()
    .withMessage('Department is required')
    .custom((val) => mongoose.Types.ObjectId.isValid(val))
    .withMessage('Invalid department ID'),
  body('availability')
    .optional()
    .isIn(['available', 'unavailable', 'on_leave'])
    .withMessage('Invalid availability status'),
  body('contactEmail').optional().isEmail(),
  body('contactPhone').optional().trim(),
  body('isActive').optional().isBoolean(),
];

const appointmentValidation = [
  body('doctor')
    .notEmpty()
    .withMessage('Doctor is required')
    .custom((val) => mongoose.Types.ObjectId.isValid(val))
    .withMessage('Invalid doctor ID'),
  body('appointmentDate')
    .notEmpty()
    .withMessage('Appointment date is required')
    .isISO8601()
    .withMessage('Invalid date format'),
  body('appointmentTime').trim().notEmpty().withMessage('Appointment time is required'),
  body('reason').optional().trim().isLength({ max: 200 }),
  body('notes').optional().trim().isLength({ max: 500 }),
  body('status')
    .optional()
    .isIn(['pending', 'confirmed', 'cancelled', 'completed'])
    .withMessage('Invalid status'),
];

const userCreateValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('phone').optional().trim(),
  body('roleName')
    .optional()
    .isIn(['admin', 'patient'])
    .withMessage('Invalid role name'),
  body('isActive').optional().isBoolean(),
];

const userUpdateValidation = [
  body('email').optional().isEmail().normalizeEmail(),
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('firstName').optional().trim().notEmpty().withMessage('First name cannot be empty'),
  body('lastName').optional().trim().notEmpty().withMessage('Last name cannot be empty'),
  body('phone').optional().trim(),
  body('isActive').optional().isBoolean(),
];

module.exports = {
  mongoId,
  departmentValidation,
  doctorValidation,
  appointmentValidation,
  userCreateValidation,
  userUpdateValidation,
};
