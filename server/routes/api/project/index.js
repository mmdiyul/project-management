const express = require('express');
const router = express.Router();
const projectController = require('./project.controller')
const { schema } = require('./project.validation')
const { protect, checkQuery, checkSchema, checkId, validationResult } = require('../../helpers')

router.get('/', checkQuery, projectController.findAll)
router.get('/page/:page', checkQuery, projectController.findAll)
router.get('/:id', checkId, projectController.findById)
router.post('/',protect, checkSchema(schema), validationResult, projectController.insert)
router.put('/:id',protect, checkId, projectController.updateById)
router.delete('/:id',protect, checkId, projectController.removeById)

module.exports = router