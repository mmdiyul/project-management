const express = require('express');
const router = express.Router();
const organizationController = require('./organization.controller')

router.get('/', organizationController.findAll)
router.get('/:id', organizationController.findById)
router.post('/', organizationController.insert)
router.put('/:id', organizationController.updateById)
router.delete('/:id', organizationController.removeById)

module.exports = router