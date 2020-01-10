const express = require('express');
const router = express.Router();
const userController = require('./user.controller')

router.get('/', userController.findAll)
router.get('/:id', userController.findById)
router.post('/', userController.insert)
router.put('/:id', userController.updateById)
router.delete('/:id', userController.removeById)

module.exports = router