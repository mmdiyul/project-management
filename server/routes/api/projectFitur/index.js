const express = require('express');
const router = express.Router();
const projectFiturController = require('./projectFitur.controller')
const { schema } = require('./projectFitur.validation')
const { protect, checkQuery, checkSchema, checkId, validationResult } = require('../../helpers')

router.get('/', checkQuery, projectFiturController.findAll)
router.get('/page/:page', checkQuery, projectFiturController.findAll)
router.get('/:id', checkId, projectFiturController.findById)
router.post('/',protect, checkSchema(schema), validationResult, projectFiturController.insert)
router.put('/:id',protect, checkId, projectFiturController.updateById)
router.delete('/:id',protect, checkId, projectFiturController.removeById)

module.exports = router