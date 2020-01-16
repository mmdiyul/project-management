const express = require('express');
const router = express.Router();
const fiturController = require('./fitur.controller')
const { schema } = require('./fitur.validation')
const { protect, checkQuery, checkSchema, checkId, validationResult } = require('../../helpers')

router.get('/', checkQuery, fiturController.findAll)
router.get('/page/:page', checkQuery, fiturController.findAll)
router.get('/:id', checkId, fiturController.findById)
router.post('/', checkSchema(schema), validationResult, fiturController.insert)
router.put('/:id', checkId, fiturController.updateById)
router.delete('/:id', checkId, fiturController.removeById)

module.exports = router