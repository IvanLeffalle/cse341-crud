const express = require('express');
const router = express.Router();
const validation = require('../middlewares/validate.js');

const lengthsController = require('../controllers/lengthsController.js');

router.get('/', lengthsController.getLengths);
router.get('/:id', lengthsController.getLengthsById);

router.post ('/',validation.saveLength, lengthsController.createLength);
router.put('/:id',validation.saveLength, lengthsController.updateLength);
router.delete('/:id', lengthsController.deleteLength);

module.exports = router;