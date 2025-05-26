const express = require('express');
const router = express.Router();

const lengthsController = require('../controllers/lengthsController.js');

router.get('/', lengthsController.getLengths);
router.get('/:id', lengthsController.getLengthsById);

router.post ('/', lengthsController.createLength);
router.put('/:id', lengthsController.updateLength);
router.delete('/:id', lengthsController.deleteLength);

module.exports = router;