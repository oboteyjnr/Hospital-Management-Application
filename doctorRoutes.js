const express = require('express');
const doctorController = require('../controllers/doctorController');
const { authenticate, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { mongoId, doctorValidation } = require('../validators/commonValidators');

const router = express.Router();

router.get('/', doctorController.getAll);
router.get('/department/:departmentId', doctorController.getByDepartment);
router.get('/:id', mongoId(), validate, doctorController.getById);

router.post(
  '/',
  authenticate,
  authorize('admin'),
  doctorValidation,
  validate,
  doctorController.create
);
router.put(
  '/:id',
  authenticate,
  authorize('admin'),
  mongoId(),
  doctorValidation,
  validate,
  doctorController.update
);
router.delete(
  '/:id',
  authenticate,
  authorize('admin'),
  mongoId(),
  validate,
  doctorController.remove
);

module.exports = router;
