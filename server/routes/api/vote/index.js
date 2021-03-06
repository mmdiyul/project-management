const express = require('express');
const router = express.Router();
const voteController = require('./vote.controller')
const { schema } = require('./vote.validation')
const { protect, checkQuery, checkSchema, checkId, validationResult } = require('../../helpers')

router.get('/', checkQuery, voteController.findAll)
router.get('/:id', checkId, voteController.findById)
router.get('/page/:page', checkQuery, voteController.findAll)
router.post('/',protect, checkSchema(schema), validationResult, voteController.insert)
router.put('/:id',protect, checkId, voteController.updateById)
router.delete('/:id',protect, checkId, voteController.removeById)

module.exports = router