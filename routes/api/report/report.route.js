const express = require('express');
const router = express.Router();
const reportController = require('./report.controller')

router.get('/', reportController.findAll)
router.get('/:id', reportController.findById)
router.post('/', reportController.insert)
router.put('/:id', reportController.updateById)
router.delete('/:id', reportController.removeById)

module.exports = router