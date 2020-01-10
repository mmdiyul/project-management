const express = require('express');
const router = express.Router();
const rolesController = require('./roles.controller')

router.get('/', rolesController.findAll)
router.get('/:id', rolesController.findById)
router.post('/', rolesController.insert)
router.put('/:id', rolesController.updateById)
router.delete('/:id', rolesController.removeById)

module.exports = router