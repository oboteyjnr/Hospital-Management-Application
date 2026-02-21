const express = require('express');
const roleController = require('../controllers/roleController');
const { authenticate, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { mongoId } = require('../validators/commonValidators');

const router = express.Router();

router.get('/', authenticate, roleController.getAll);
router.get('/:id', authenticate, mongoId(), validate, roleController.getById);

module.exports = router;
