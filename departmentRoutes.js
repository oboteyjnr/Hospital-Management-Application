const express = require('express');
const departmentController = require('../controllers/departmentController');
const { authenticate, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { mongoId, departmentValidation } = require('../validators/commonValidators');

const router = express.Router();

router.get('/', departmentController.getAll);
router.get('/:id', mongoId(), validate, departmentController.getById);

router.post(
  '/',
  authenticate,
  authorize('admin'),
  departmentValidation,
  validate,
  departmentController.create
);
router.put(
  '/:id',
  authenticate,
  authorize('admin'),
  mongoId(),
  departmentValidation,
  validate,
  departmentController.update
);
router.delete(
  '/:id',
  authenticate,
  authorize('admin'),
  mongoId(),
  validate,
  departmentController.remove
);

module.exports = router;
