const express = require('express');
const router = express.Router();
const projectController = require('./project.controller')

router.get('/', projectController.findAll)
router.get('/:id', projectController.findById)
router.post('/', projectController.insert)
router.put('/:id', projectController.updateById)
router.delete('/:id', projectController.removeById)

module.exports = router