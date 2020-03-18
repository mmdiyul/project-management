const express = require('express');
const router = express.Router();
const userController = require('./user.controller')
const { schema } = require('./user.validation')
const { protect, checkQuery, checkSchema, checkId, validationResult } = require('../../helpers')

router.get('/', checkQuery, userController.findAll)
router.get('/page/:page', checkQuery, userController.findAll)
router.get('/:id', checkId, userController.findById)
router.post('/',protect, checkSchema(schema), validationResult, userController.insert)
router.put('/:id',protect, checkId, userController.updateById)
router.delete('/:id',protect, checkId, userController.removeById)

module.exports = router