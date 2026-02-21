const express = require('express');
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  mongoId,
  userCreateValidation,
  userUpdateValidation,
} = require('../validators/commonValidators');

const router = express.Router();

router.use(authenticate);
router.use(authorize('admin'));

router.get('/', userController.getAll);
router.get('/:id', mongoId(), validate, userController.getById);
router.post('/', userCreateValidation, validate, userController.create);
router.put('/:id', mongoId(), userUpdateValidation, validate, userController.update);
router.delete('/:id', mongoId(), validate, userController.remove);

module.exports = router;
