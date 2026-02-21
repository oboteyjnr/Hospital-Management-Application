const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const { authenticate, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { mongoId, appointmentValidation } = require('../validators/commonValidators');

const router = express.Router();

router.get('/my', authenticate, appointmentController.getMyAppointments);
router.get('/', authenticate, authorize('admin'), appointmentController.getAll);
router.get('/:id', authenticate, mongoId(), validate, appointmentController.getById);

router.post(
  '/',
  authenticate,
  appointmentValidation,
  validate,
  appointmentController.create
);
router.put(
  '/:id',
  authenticate,
  mongoId(),
  validate,
  appointmentController.update
);
router.delete(
  '/:id',
  authenticate,
  mongoId(),
  validate,
  appointmentController.remove
);

module.exports = router;
