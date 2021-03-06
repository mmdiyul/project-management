const express = require('express');
const router = express.Router();
const tipeController = require('./tipe.controller')
const { schema } = require('./tipe.validation')
const { protect, checkQuery, checkSchema, checkId, validationResult } = require('../../helpers')

router.get('/', checkQuery, tipeController.findAll)
router.get('/:id', checkId, tipeController.findById)
router.get('/page/:page', checkQuery, tipeController.findAll)
router.post('/',protect, checkSchema(schema), validationResult, tipeController.insert)
router.put('/:id',protect, checkId, tipeController.updateById)
router.delete('/:id',protect, checkId, tipeController.removeById)

module.exports = router