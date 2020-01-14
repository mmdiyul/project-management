const express = require('express');
const router = express.Router();
const tipeController = require('./tipe.controller')
const { schema } = require('./tipe.validation')
const { protect, checkQuery, checkSchema, checkId, validationResult } = require('../../helpers')

router.get('/', checkQuery, tipeController.findAll)
router.get('/:id', checkId, tipeController.findById)
router.post('/', checkSchema(schema), validationResult, tipeController.insert)
router.put('/:id', checkId, tipeController.updateById)
router.delete('/:id', checkId, tipeController.removeById)

module.exports = router