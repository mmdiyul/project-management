const express = require('express');
const router = express.Router();
const tipeController = require('./tipe.controller')

router.get('/', tipeController.findAll)
router.get('/:id', tipeController.findById)
router.post('/', tipeController.insert)
router.put('/:id', tipeController.updateById)
router.delete('/:id', tipeController.removeById)

module.exports = router