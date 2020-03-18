const express = require('express');
const router = express.Router();
const organizationController = require('./organization.controller')
const { schema } = require('./organization.validation')
const { protect, checkQuery, checkSchema, checkId, validationResult } = require('../../helpers')

router.get('/', checkQuery, organizationController.findAll)
router.get('/page/:page', checkQuery, organizationController.findAll)
router.get('/:id', checkId, organizationController.findById)
router.post('/',protect, checkSchema(schema), validationResult, organizationController.insert)
router.put('/:id',protect, checkId, organizationController.updateById)
router.delete('/:id',protect, checkId, organizationController.removeById)

module.exports = router