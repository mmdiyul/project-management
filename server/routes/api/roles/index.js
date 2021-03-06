const express = require('express');
const router = express.Router();
const rolesController = require('./roles.controller')
const { schema } = require('./roles.validation')
const { protect, checkQuery, checkSchema, checkId, validationResult } = require('../../helpers')

router.get('/', checkQuery, rolesController.findAll)
router.get('/:id', checkId, rolesController.findById)
router.get('/page/:page', checkQuery, rolesController.findAll)
router.post('/',protect, checkSchema(schema), validationResult, rolesController.insert)
router.put('/:id',protect, checkId, rolesController.updateById)
router.delete('/:id',protect, checkId, rolesController.removeById)

module.exports = router