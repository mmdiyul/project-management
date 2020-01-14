const express = require('express');
const router = express.Router();
const reportController = require('./report.controller')
const { schema } = require('./report.validation')
const { protect, checkQuery, checkSchema, checkId, validationResult } = require('../../helpers')

router.get('/', checkQuery, reportController.findAll)
router.get('/:id', checkId, reportController.findById)
router.post('/', checkSchema(schema), validationResult, reportController.insert)
router.put('/:id', checkId, reportController.updateById)
router.delete('/:id', checkId, reportController.removeById)

module.exports = router