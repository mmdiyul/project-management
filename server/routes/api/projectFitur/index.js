const express = require('express');
const router = express.Router();
const projectFiturController = require('./projectFitur.controller')
const { schema } = require('./projectFitur.validation')
const { protect, checkQuery, checkSchema, checkId, validationResult } = require('../../helpers')

router.get('/', checkQuery, projectFiturController.findAll)
router.get('/:id', checkId, projectFiturController.findById)
router.post('/', checkSchema(schema), validationResult, projectFiturController.insert)
router.put('/:id', checkId, projectFiturController.updateById)
router.delete('/:id', checkId, projectFiturController.removeById)

module.exports = router