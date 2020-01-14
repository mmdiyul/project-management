const express = require('express');
const router = express.Router();
const projectFiturController = require('./projectFitur.controller')

router.get('/', projectFiturController.findAll)
router.get('/:id', projectFiturController.findById)
router.post('/', projectFiturController.insert)
router.put('/:id', projectFiturController.updateById)
router.delete('/:id', projectFiturController.removeById)

module.exports = router